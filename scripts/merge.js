const fs = require('fs');
const path = require('path');

const mainFile = path.join(__dirname, '../src/data/preguntas.json');
let mainData = JSON.parse(fs.readFileSync(mainFile, 'utf8'));

let mergedCount = 0;

for (let i = 1; i <= 10; i++) {
  const chunkFile = path.join(__dirname, `../scratch/output_chunk_${i}.json`);
  if (fs.existsSync(chunkFile)) {
    const chunkData = JSON.parse(fs.readFileSync(chunkFile, 'utf8'));
    for (const chunkQ of chunkData) {
      if (chunkQ.explicacionEs && chunkQ.explicacionEs.length > 5) {
        const qIndex = mainData.findIndex(q => q.id === chunkQ.id);
        if (qIndex !== -1) {
          mainData[qIndex].explicacionEs = chunkQ.explicacionEs;
          mergedCount++;
        }
      }
    }
  }
}

fs.writeFileSync(mainFile, JSON.stringify(mainData, null, 2));
console.log(`Merged ${mergedCount} translated explanations back into the main database!`);
