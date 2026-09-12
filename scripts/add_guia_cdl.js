const fs = require('fs');
const path = require('path');

const preguntasPath = path.join(__dirname, '../src/data/preguntas.json');
let preguntas = JSON.parse(fs.readFileSync(preguntasPath, 'utf8'));

// Remove any existing guia-cdl questions just in case
preguntas = preguntas.filter(p => p.moduloId !== 'guia-cdl');

const nuevasPreguntas = [
  // Unit 0 (Unidad 1)
  {
    id: "guia-001",
    moduloId: "guia-cdl",
    preguntaEn: "WHAT IS THE MINIMUM AGE TO DRIVE A COMMERCIAL VEHICLE FOR INTERSTATE COMMERCE?",
    opcionesEn: ["18 YEARS OLD.", "21 YEARS OLD.", "25 YEARS OLD."],
    correctaIndex: 1,
    explicacionEs: "Por ley federal, debes tener al menos 21 años para cruzar líneas estatales (comercio interestatal) con un vehículo comercial.",
    unidadId: 0
  },
  {
    id: "guia-002",
    moduloId: "guia-cdl",
    preguntaEn: "HOW LONG MUST YOU HOLD A COMMERCIAL LEARNER'S PERMIT (CLP) BEFORE TAKING THE SKILLS TEST?",
    opcionesEn: ["7 DAYS.", "14 DAYS.", "30 DAYS."],
    correctaIndex: 1,
    explicacionEs: "Después de obtener el permiso de aprendizaje (CLP), el gobierno exige un período de espera obligatorio de 14 días antes de hacer el examen práctico.",
    unidadId: 0
  },
  {
    id: "guia-003",
    moduloId: "guia-cdl",
    preguntaEn: "WHICH OF THE FOLLOWING WILL DISQUALIFY YOU FROM OBTAINING A CDL?",
    opcionesEn: ["A SUSPENDED DRIVER'S LICENSE OR A DUI.", "HAVING A PARKING TICKET.", "WEARING GLASSES WHILE DRIVING."],
    correctaIndex: 0,
    explicacionEs: "Tener una licencia regular suspendida o antecedentes recientes de conducir bajo la influencia del alcohol (DUI) te descalifica automáticamente para obtener una CDL.",
    unidadId: 0
  },
  {
    id: "guia-004",
    moduloId: "guia-cdl",
    preguntaEn: "WHAT IS THE MINIMUM AGE TO DRIVE A COMMERCIAL VEHICLE INTRASTATE (WITHIN ONE STATE)?",
    opcionesEn: ["16 YEARS OLD.", "18 YEARS OLD.", "21 YEARS OLD."],
    correctaIndex: 1,
    explicacionEs: "Aunque para cruzar fronteras estatales se requieren 21 años, la mayoría de los estados permiten conducir vehículos comerciales dentro del estado a partir de los 18 años.",
    unidadId: 0
  },
  {
    id: "guia-005",
    moduloId: "guia-cdl",
    preguntaEn: "WHAT MUST YOU OBTAIN BEFORE YOU CAN GET YOUR COMMERCIAL DRIVER'S LICENSE (CDL)?",
    opcionesEn: ["A DOT MEDICAL CARD AND A COMMERCIAL LEARNER'S PERMIT (CLP).", "A HAZMAT ENDORSEMENT.", "A PASSPORT."],
    correctaIndex: 0,
    explicacionEs: "El primer paso oficial en tu carrera es aprobar los exámenes teóricos para obtener el CLP, acompañado de tu certificación médica (Tarjeta DOT).",
    unidadId: 0
  },
  
  // Unit 1 (Unidad 2)
  {
    id: "guia-006",
    moduloId: "guia-cdl",
    preguntaEn: "WHAT IS THE MINIMUM VISUAL ACUITY REQUIRED TO PASS THE DOT MEDICAL EXAM?",
    opcionesEn: ["20/20 IN BOTH EYES.", "20/40 IN EACH EYE.", "20/50 IN AT LEAST ONE EYE."],
    correctaIndex: 1,
    explicacionEs: "El Departamento de Transporte exige una visión mínima de 20/40 en cada ojo, ya sea con o sin lentes correctivos.",
    unidadId: 1
  },
  {
    id: "guia-007",
    moduloId: "guia-cdl",
    preguntaEn: "HOW LONG IS A DOT MEDICAL EXAMINER'S CERTIFICATE USUALLY VALID FOR?",
    opcionesEn: ["1 YEAR.", "UP TO 2 YEARS.", "UP TO 5 YEARS."],
    correctaIndex: 1,
    explicacionEs: "Si gozas de buena salud, tu tarjeta médica DOT tendrá una validez máxima de 2 años antes de necesitar renovación.",
    unidadId: 1
  },
  {
    id: "guia-008",
    moduloId: "guia-cdl",
    preguntaEn: "WHAT IS THE HEARING REQUIREMENT FOR A COMMERCIAL DRIVER?",
    opcionesEn: ["MUST HEAR A FORCED WHISPER AT NO LESS THAN 5 FEET.", "MUST HAVE PERFECT HEARING.", "MUST HEAR A NORMAL CONVERSATION AT 20 FEET."],
    correctaIndex: 0,
    explicacionEs: "La prueba auditiva federal requiere que puedas percibir un susurro forzado a una distancia de al menos 5 pies (con o sin audífonos).",
    unidadId: 1
  },
  {
    id: "guia-009",
    moduloId: "guia-cdl",
    preguntaEn: "WHICH OF THESE MEDICAL CONDITIONS CAN PREVENT YOU FROM GETTING A MEDICAL CARD?",
    opcionesEn: ["WEARING CONTACT LENSES.", "UNCONTROLLED EPILEPSY OR INSULIN-DEPENDENT DIABETES.", "HAVING HIGH CHOLESTEROL."],
    correctaIndex: 1,
    explicacionEs: "Condiciones críticas como la epilepsia no controlada o la diabetes tratada con insulina pueden causar pérdida súbita del conocimiento, lo que descalifica a un conductor.",
    unidadId: 1
  },
  {
    id: "guia-010",
    moduloId: "guia-cdl",
    preguntaEn: "WHAT IS THE MINIMUM PERIPHERAL VISION REQUIRED BY THE DOT?",
    opcionesEn: ["50 DEGREES IN THE HORIZONTAL MERIDIAN.", "70 DEGREES IN THE HORIZONTAL MERIDIAN.", "90 DEGREES IN THE HORIZONTAL MERIDIAN."],
    correctaIndex: 1,
    explicacionEs: "Para asegurar que puedas ver vehículos en tus puntos ciegos laterales, la ley exige un campo visual periférico de al menos 70 grados.",
    unidadId: 1
  },

  // Unit 2 (Unidad 3)
  {
    id: "guia-011",
    moduloId: "guia-cdl",
    preguntaEn: "WHICH COMBINATION OF VEHICLES REQUIRES A CLASS A CDL?",
    opcionesEn: ["A VEHICLE WITH A GROSS COMBINATION WEIGHT RATING (GCWR) OF 26,001 LBS OR MORE, PROVIDED THE TOWED VEHICLE IS HEAVIER THAN 10,000 LBS.", "A SINGLE VEHICLE WITH A GVWR OF 26,001 LBS.", "A VEHICLE DESIGNED TO TRANSPORT 16 OR MORE PASSENGERS."],
    correctaIndex: 0,
    explicacionEs: "La Licencia Clase A es para tractocamiones; se requiere cuando el peso total (GCWR) supera las 26,000 lbs y el remolque por sí solo supera las 10,000 lbs.",
    unidadId: 2
  },
  {
    id: "guia-012",
    moduloId: "guia-cdl",
    preguntaEn: "WHAT ENDORSEMENT IS REQUIRED TO DRIVE A VEHICLE DESIGNED TO TRANSPORT LIQUIDS IN BULK?",
    opcionesEn: ["(T) DOUBLE/TRIPLE TRAILERS.", "(N) TANK VEHICLES.", "(H) HAZARDOUS MATERIALS."],
    correctaIndex: 1,
    explicacionEs: "El endoso 'N' (Tanques) es mandatorio para transportar líquidos a granel, ya que requiere habilidades especiales para controlar la 'oleada' (movimiento del líquido).",
    unidadId: 2
  },
  {
    id: "guia-013",
    moduloId: "guia-cdl",
    preguntaEn: "WHICH CDL CLASS IS REQUIRED TO DRIVE A SINGLE VEHICLE WEIGHING 26,001 LBS OR MORE?",
    opcionesEn: ["CLASS A.", "CLASS B.", "CLASS C."],
    correctaIndex: 1,
    explicacionEs: "La Licencia Clase B te permite conducir vehículos individuales pesados, como camiones de basura o autobuses de tránsito, sin remolques pesados.",
    unidadId: 2
  },
  {
    id: "guia-014",
    moduloId: "guia-cdl",
    preguntaEn: "WHAT ADDITIONAL BACKGROUND CHECK IS REQUIRED FOR A HAZARDOUS MATERIALS (H) ENDORSEMENT?",
    opcionesEn: ["A CREDIT CHECK.", "AN FBI FINGERPRINT AND BACKGROUND CHECK (TSA).", "A SOCIAL MEDIA CHECK."],
    correctaIndex: 1,
    explicacionEs: "Por regulaciones de seguridad nacional, el endoso HazMat requiere que la TSA realice una investigación de antecedentes penales a través de huellas dactilares.",
    unidadId: 2
  },
  {
    id: "guia-015",
    moduloId: "guia-cdl",
    preguntaEn: "WHICH ENDORSEMENT REQUIRES YOU TO PASS A SKILLS (DRIVING) TEST IN ADDITION TO A WRITTEN TEST?",
    opcionesEn: ["(N) TANK VEHICLE.", "(H) HAZARDOUS MATERIALS.", "(P) PASSENGER OR (S) SCHOOL BUS."],
    correctaIndex: 2,
    explicacionEs: "Transportar personas es una enorme responsabilidad. Por ello, los endosos de pasajeros y transporte escolar requieren que demuestres tus habilidades prácticas al volante.",
    unidadId: 2
  }
];

preguntas.push(...nuevasPreguntas);

fs.writeFileSync(preguntasPath, JSON.stringify(preguntas, null, 2));
console.log('Added 15 questions for guia-cdl. Total questions now: ' + preguntas.length);
