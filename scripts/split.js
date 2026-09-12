const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/preguntas.json');
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Only grab ones without explanation or short ones
const needsExpl = data.filter(q => !q.explicacionEs || q.explicacionEs.length < 10);

const chunkSize = 50;
let chunks = [];

for (let i = 0; i < needsExpl.length; i += chunkSize) {
  chunks.push(needsExpl.slice(i, i + chunkSize));
}

chunks.forEach((chunk, index) => {
  fs.writeFileSync(
    path.join(__dirname, `../scratch/input_chunk_${index + 1}.json`), 
    JSON.stringify(chunk, null, 2)
  );
});
console.log(`Split into ${chunks.length} chunks.`);
