const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const docsDir = path.join(__dirname, '../docs');
const outputDir = path.join(__dirname, '../src/data');

const files = [
  { file: 'GENERAL KNOWLEDGE 1-314.docx', modId: 'general' },
  { file: 'AIR BRAKES 1-78.docx', modId: 'frenos-aire' },
  { file: 'COMBINATION VEHICLE 1-82.docx', modId: 'combinacion' }
];

let allQuestions = [];

for (const {file, modId} of files) {
  const filePath = path.join(docsDir, file);
  console.log(`Extracting ${file}...`);
  try {
    const html = execSync(`textutil -convert html "${filePath}" -stdout`).toString();
    
    const styleMatch = html.match(/<style.*?>([\s\S]*?)<\/style>/);
    const greenClasses = [];
    if (styleMatch) {
      const styles = styleMatch[1].split('\n');
      for (const style of styles) {
        if (style.includes('color: #70ad47') || style.includes('color: #92d050') || style.includes('color: #00b050')) {
          const classMatch = style.match(/\.([a-z0-9]+)/);
          if (classMatch) {
            greenClasses.push(classMatch[1]);
          }
        }
      }
    }

    const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
    if (!bodyMatch) continue;
    const body = bodyMatch[1];

    const liRegex = /<li(?: class="([^"]*)")?>([\s\S]*?)<\/li>/g;
    let match;
    let currentQuestion = null;
    let fileQCount = 0;

    while ((match = liRegex.exec(body)) !== null) {
        const className = match[1] || '';
        const rawContent = match[2];
        const isQuestion = rawContent.includes('<b>') || rawContent.includes('<strong>');
        let text = rawContent.replace(/<[^>]*>?/gm, '').trim();
        
        text = text.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
        
        if (!text) continue;

        if (isQuestion) {
            if (currentQuestion && currentQuestion.opcionesEn.length > 0) {
                allQuestions.push(currentQuestion);
            }
            fileQCount++;
            currentQuestion = {
               id: `${modId}-${fileQCount}`,
               moduloId: modId,
               preguntaEn: text,
               opcionesEn: [],
               correctaIndex: -1,
               explicacionEs: ""
            };
        } else if (currentQuestion) {
            const isGreen = greenClasses.some(c => className.includes(c));
            currentQuestion.opcionesEn.push(text);
            if (isGreen) {
                currentQuestion.correctaIndex = currentQuestion.opcionesEn.length - 1;
            }
        }
    }
    if (currentQuestion && currentQuestion.opcionesEn.length > 0) {
        allQuestions.push(currentQuestion);
    }
  } catch (err) {
    console.error("Error reading file", file, err);
  }
}

fs.writeFileSync(path.join(outputDir, 'preguntas.json'), JSON.stringify(allQuestions, null, 2));
console.log(`Successfully extracted ${allQuestions.length} questions in total!`);
