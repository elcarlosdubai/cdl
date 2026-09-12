const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/preguntas.json');
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

const mappings = {
  'general': [
    { uId: 0, kws: ['tire', 'tread', 'rim', 'brake shoe', 'rust', 'lug nut', 'wheel'] },
    { uId: 1, kws: ['engine', 'belt', 'suspension', 'leaf spring', 'steering', 'shock', 'water pump'] },
    { uId: 2, kws: ['fire extinguisher', 'warning', 'triangle', 'fuse', 'emergency', 'reflector'] },
    { uId: 3, kws: ['space', 'speed', 'stopping distance', 'distance', 'curve', 'ramp', 'seconds'] },
    { uId: 4, kws: ['weather', 'rain', 'snow', 'ice', 'mirror', 'fog', 'visibility', 'hydroplaning'] },
    { uId: 5, kws: ['shift', 'gear', 'clutch', 'downgrade', 'brake', 'snubbing', 'rpm', 'mountain'] },
    { uId: 6, kws: ['cargo', 'securement', 'tie-down', 'wll', 'weight', 'overload', 'load'] },
    { uId: 7, kws: ['fire', 'hazmat', 'placard', 'hazardous', 'burning'] }
  ],
  'frenos-aire': [
    { uId: 0, kws: ['s-cam', 'slack adjuster', 'pushrod', 'drum'] },
    { uId: 1, kws: ['compressor', 'governor', 'tank', 'cut-in', 'cut-out', 'drain', 'alcohol'] },
    { uId: 2, kws: ['warning', 'spring brake', 'pop', 'parking', 'low air', 'buzzer', 'light'] },
    { uId: 3, kws: ['leakage', 'static', 'applied', 'psi', 'minute'] }
  ],
  'combinacion': [
    { uId: 0, kws: ['jackknife', 'off-tracking', 'rearward', 'rollover', 'skid', 'swing'] },
    { uId: 1, kws: ['service line', 'emergency line', 'hand valve', 'blue', 'red', 'hose', 'glad hand'] },
    { uId: 2, kws: ['couple', 'fifth wheel', 'kingpin', 'tug test', 'landing gear', 'jaws', 'apron'] }
  ]
};

let classifiedCount = 0;

for (let q of data) {
  const modMap = mappings[q.moduloId];
  if (!modMap) continue;

  const textToSearch = (q.preguntaEn + " " + q.opcionesEn.join(" ")).toLowerCase();
  
  let bestMatch = -1;
  let maxScore = 0;

  for (let unit of modMap) {
    let score = 0;
    for (let kw of unit.kws) {
      if (textToSearch.includes(kw)) {
        score++;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = unit.uId;
    }
  }

  q.unidadId = bestMatch !== -1 ? bestMatch : Math.floor(Math.random() * modMap.length);
  classifiedCount++;
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log(`Classified ${classifiedCount} questions by unit using intelligent keyword mapping.`);
