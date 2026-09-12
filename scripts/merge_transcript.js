const fs = require('fs');
const path = require('path');

const logPath = '/Users/carlosbaez/.gemini/antigravity/brain/7071b991-436c-4a39-a7b0-0d7833a6e46a/.system_generated/logs/transcript_full.jsonl';
const preguntasPath = path.join(__dirname, '../src/data/preguntas.json');

const lines = fs.readFileSync(logPath, 'utf8').split('\n').filter(Boolean);
const preguntas = JSON.parse(fs.readFileSync(preguntasPath, 'utf8'));
const preguntasMap = new Map(preguntas.map(p => [p.id, p]));

let updatedCount = 0;

for (const line of lines) {
    try {
        const entry = JSON.parse(line);
        if (entry.content && entry.content.includes('"explicacionEs"')) {
            const match = entry.content.match(/\[\s*\{[\s\S]*\}\s*\]/);
            if (match) {
                try {
                    const data = JSON.parse(match[0]);
                    if (Array.isArray(data)) {
                        for (const item of data) {
                            if (item.id && item.explicacionEs && item.explicacionEs.trim() !== '') {
                                const existing = preguntasMap.get(item.id);
                                if (existing && (!existing.explicacionEs || existing.explicacionEs.trim() === '')) {
                                    existing.explicacionEs = item.explicacionEs;
                                    updatedCount++;
                                }
                            }
                        }
                    }
                } catch(e) {
                    // ignore parse errors
                }
            }
        }
    } catch(e) { }
}

// Also check scratch dir
const scratchDir = path.join(__dirname, '../scratch');
if (fs.existsSync(scratchDir)) {
    const files = fs.readdirSync(scratchDir).filter(f => f.startsWith('output_chunk_') && f.endsWith('.json'));
    for (const file of files) {
        try {
            const data = JSON.parse(fs.readFileSync(path.join(scratchDir, file), 'utf8'));
            for (const item of data) {
                if (item.id && item.explicacionEs && item.explicacionEs.trim() !== '') {
                    const existing = preguntasMap.get(item.id);
                    if (existing && (!existing.explicacionEs || existing.explicacionEs.trim() === '')) {
                        existing.explicacionEs = item.explicacionEs;
                        updatedCount++;
                    }
                }
            }
        } catch(e) {}
    }
}

fs.writeFileSync(preguntasPath, JSON.stringify(preguntas, null, 2));

const missingCount = preguntas.filter(p => !p.explicacionEs || p.explicacionEs.trim() === '').length;
console.log(`Updated ${updatedCount} explanations.`);
console.log(`Missing explanations remaining: ${missingCount}`);
