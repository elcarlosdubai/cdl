"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import preguntasDataRaw from '../../../data/preguntas.json';

// Fisher-Yates Shuffle para mezclar preguntas aleatoriamente
function mezclarArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function EngineTest({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = use(params);
  const searchParams = useSearchParams();
  const unidadParam = searchParams.get('unidad');

  const returnUrl = unidadParam !== null && tipo !== 'simulador' ? `/lecturas/${tipo}?unidad=${unidadParam}` : '/test';
  const returnText = unidadParam !== null && tipo !== 'simulador' ? 'Volver a la Lectura' : 'Volver al Menú de Tests';

  const [preguntas, setPreguntas] = useState<typeof preguntasDataRaw>([]);
  const [cargando, setCargando] = useState(true);

  const [indicePregunta, setIndicePregunta] = useState(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<number | null>(null);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [testFinalizado, setTestFinalizado] = useState(false);

  // Inicializar el set de preguntas basado en el tipo
  useEffect(() => {
    let filtradas = [];
    if (tipo === 'simulador') {
      // 50 preguntas aleatorias de toda la base
      filtradas = mezclarArray(preguntasDataRaw).slice(0, 50);
    } else {
      // Preguntas de un módulo específico
      filtradas = preguntasDataRaw.filter(p => p.moduloId === tipo);
      
      // Si hay un param de 'unidad', es un Mini-Test
      if (unidadParam !== null) {
        filtradas = filtradas.filter(p => p.unidadId === parseInt(unidadParam));
        filtradas = mezclarArray(filtradas).slice(0, 5); // Solo 5 preguntas
      } else {
        // Si no, es un test de módulo completo
        filtradas = mezclarArray(filtradas);
      }
    }
    setPreguntas(filtradas);
    setCargando(false);
  }, [tipo]);

  if (cargando) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Cargando examen...</div>;
  }

  if (preguntas.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-6">🚧</div>
        <h2 className="text-3xl font-bold mb-4">Módulo en Construcción</h2>
        <p className="text-zinc-400 mb-8 max-w-md">
          Aún no hemos agregado preguntas de práctica para este módulo específico. ¡Vuelve pronto!
        </p>
        <Link href={returnUrl} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors inline-block mt-4">
          {returnText}
        </Link>
      </div>
    );
  }

  const preguntaActual = preguntas[indicePregunta];
  const totalPreguntas = preguntas.length;
  const progreso = ((indicePregunta) / totalPreguntas) * 100;

  const handleSeleccionarOpcion = (index: number) => {
    if (mostrarExplicacion) return; // Bloquear clics extra

    setOpcionSeleccionada(index);
    setMostrarExplicacion(true);

    if (index === preguntaActual.correctaIndex) {
      setPuntaje((prev) => prev + 1);
    }
  };

  const handleSiguiente = () => {
    if (indicePregunta + 1 < totalPreguntas) {
      setIndicePregunta((prev) => prev + 1);
      setOpcionSeleccionada(null);
      setMostrarExplicacion(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTestFinalizado(true);
    }
  };

  const reiniciarTest = () => {
    // Si queremos, podemos volver a mezclar las preguntas al reiniciar
    setPreguntas(mezclarArray(preguntas));
    setIndicePregunta(0);
    setOpcionSeleccionada(null);
    setMostrarExplicacion(false);
    setPuntaje(0);
    setTestFinalizado(false);
  };

  if (testFinalizado) {
    const porcentaje = Math.round((puntaje / totalPreguntas) * 100);
    const aprobo = porcentaje >= 80;

    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-900 border border-white/10 p-10 rounded-3xl text-center shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner" 
               style={{ backgroundColor: aprobo ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}>
            {aprobo ? '🏆' : '☠️'}
          </div>
          <h1 className="text-3xl font-extrabold mb-2 text-white">
            {aprobo ? '¡Aprobado!' : 'Reprobado'}
          </h1>
          <p className="text-zinc-400 mb-8 text-lg">
            Obtuviste <strong className={aprobo ? "text-emerald-400" : "text-red-400"}>{puntaje}</strong> de {totalPreguntas} preguntas correctas ({porcentaje}%).
            {!aprobo && " Recuerda que necesitas 80% para pasar en el DMV."}
          </p>
          
          <div className="flex flex-col gap-4">
            <button onClick={reiniciarTest} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors">
              Intentar de nuevo
            </button>
            <Link href={returnUrl} className="w-full py-4 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-colors">
              {returnText}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30 flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl shrink-0">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={returnUrl} className="text-sm font-medium text-zinc-400 hover:text-white transition flex items-center gap-2">
            <span>&larr;</span> Salir del Test
          </Link>
          <div className="font-bold tracking-tighter text-blue-400">
            Pregunta {indicePregunta + 1} / {totalPreguntas}
          </div>
        </div>
        <div className="w-full h-1 bg-zinc-800">
          <div className="h-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: `${progreso}%` }} />
        </div>
      </nav>

      <main className="flex-grow py-8 md:py-12 px-4 flex justify-center w-full">
        <div className="max-w-3xl w-full">
          
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500" key={`q-${preguntaActual.id}`}>
            <span className="inline-block px-3 py-1 bg-white/10 text-zinc-300 text-xs font-bold rounded-md mb-4 uppercase tracking-widest border border-white/10">
              {tipo === 'simulador' ? 'SIMULADOR DMV' : preguntaActual.moduloId.replace('-', ' ')}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
              {preguntaActual.preguntaEn}
            </h2>
          </div>

          <div className="space-y-4 mb-10">
            {preguntaActual.opcionesEn.map((opcion, index) => {
              const esCorrecta = index === preguntaActual.correctaIndex;
              const fueSeleccionada = opcionSeleccionada === index;
              
              let clasesBoton = "w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 text-lg md:text-xl font-medium shadow-sm ";
              
              if (!mostrarExplicacion) {
                clasesBoton += "bg-zinc-900/50 border-white/10 hover:border-blue-500/50 hover:bg-zinc-800 text-zinc-300";
              } else {
                if (esCorrecta) {
                  clasesBoton += "bg-emerald-900/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]";
                } else if (fueSeleccionada) {
                  clasesBoton += "bg-red-900/20 border-red-500/50 text-red-400";
                } else {
                  clasesBoton += "bg-zinc-900/30 border-white/5 text-zinc-600 opacity-50";
                }
              }

              return (
                <button key={index} onClick={() => handleSeleccionarOpcion(index)} className={clasesBoton}>
                  <div className="flex gap-4">
                    <span className="font-bold opacity-50">{String.fromCharCode(65 + index)}. </span>
                    <span>{opcion}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {mostrarExplicacion && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              {preguntaActual.explicacionEs ? (
                <div className={`p-6 rounded-2xl border ${
                  opcionSeleccionada === preguntaActual.correctaIndex 
                    ? 'bg-emerald-900/10 border-emerald-500/20' 
                    : 'bg-blue-900/10 border-blue-500/20'
                }`}>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
                    <span>🧠</span> Explicación en Español
                  </h3>
                  <p className="text-lg text-zinc-200 leading-relaxed">
                    {preguntaActual.explicacionEs}
                  </p>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border bg-yellow-900/10 border-yellow-500/20">
                  <p className="text-zinc-400 italic text-sm">La explicación en español para esta pregunta está siendo procesada y se añadirá pronto.</p>
                </div>
              )}

              <button
                onClick={handleSiguiente}
                className="w-full py-5 bg-white text-black text-xl font-bold rounded-2xl hover:bg-zinc-200 transition-colors shadow-lg"
              >
                {indicePregunta + 1 === totalPreguntas ? 'Ver Resultados' : 'Siguiente Pregunta'}
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
