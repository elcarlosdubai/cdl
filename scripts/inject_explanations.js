const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/preguntas.json');
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

const updates = {
  "frenos-aire-1": "Bombear el pedal (pisar y soltar repetidamente) gasta el aire a presión más rápido de lo que el compresor puede reponerlo, causándote una pérdida de presión peligrosa.",
  "frenos-aire-2": "En una emergencia, debes frenar de manera que las llantas no se bloqueen. Esto te permite poder girar el volante para esquivar obstáculos y mantener el camión en línea recta.",
  "frenos-aire-3": "El freno de tambor de Leva en S (S-cam) es el estándar en casi todos los camiones comerciales pesados.",
  "frenos-aire-4": "Si la línea de servicio se rompe y pisas el freno, el aire escapará. Al bajar la presión drásticamente, la válvula de protección se activará y los frenos de emergencia del remolque se bloquearán.",
  "frenos-aire-5": "Por ley federal, un sistema de frenos de aire dual en buen estado debe poder subir la presión de 85 a 100 psi en un máximo de 45 segundos.",
  "general-1": "Siempre debes inspeccionar tu vehículo. Es tu responsabilidad por ley federal asegurarte de que es seguro conducirlo antes de salir a la carretera.",
  "general-2": "Al retroceder, el punto ciego derecho es inmenso. Siempre debes retroceder hacia el lado izquierdo (lado del conductor) para poder ver el final de tu remolque por la ventana."
};

let count = 0;
for (let q of data) {
  if (updates[q.id]) {
    q.explicacionEs = updates[q.id];
    count++;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log(`Injected ${count} Spanish explanations.`);
