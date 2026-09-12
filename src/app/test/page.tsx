"use client";

import Link from 'next/link';

export default function TestDashboard() {
  const modulos = [
    { id: 'general', titulo: 'Conocimientos Generales', icono: '📖', qs: 314, desc: 'El núcleo del examen. Leyes, inspecciones y física básica.' },
    { id: 'frenos-aire', titulo: 'Frenos de Aire', icono: '🛑', qs: 78, desc: 'Válvulas, presiones, fugas y el sistema S-Cam.' },
    { id: 'combinacion', titulo: 'Vehículos de Combinación', icono: '🚛', qs: 82, desc: 'Efecto látigo, acoplamiento y físicas del remolque.' }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition flex items-center gap-2 mb-6">
            <span>&larr;</span> Volver al Inicio
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Simulador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Exámenes</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Elige tu modalidad de entrenamiento. Practica por áreas específicas o enfréntate al simulador completo estilo DMV.
          </p>
        </header>

        {/* Sección 1: Simulador Real */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-600/10 border border-blue-500/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 hover:border-blue-500/40 transition-all">
            <div className="text-6xl md:text-8xl">🔥</div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">Simulador Real del DMV</h2>
              <p className="text-zinc-300 text-lg mb-6">
                50 preguntas aleatorias mezcladas de todos los temas. Exactamente la misma longitud y dificultad del examen oficial. ¿Estás listo?
              </p>
              <Link href="/test/simulador" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-900/50">
                Iniciar Prueba Oficial
              </Link>
            </div>
          </div>
        </section>

        {/* Sección 2: Prácticas por Módulo */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-8">Entrenamiento por Módulo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modulos.map(mod => (
              <div key={mod.id} className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-800/80 hover:border-white/10 transition-all flex flex-col h-full">
                <div className="text-4xl mb-6">{mod.icono}</div>
                <h4 className="text-xl font-bold text-white mb-2">{mod.titulo}</h4>
                <p className="text-sm text-zinc-400 mb-6 flex-grow">{mod.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{mod.qs} Preguntas</span>
                  <Link href={`/test/${mod.id}`} className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors text-sm">
                    Practicar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
