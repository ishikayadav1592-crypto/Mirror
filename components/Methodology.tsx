
import React from 'react';

const Methodology: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="space-y-4 border-b-4 border-white/40 pb-8 text-center">
        <h1 className="text-6xl font-black text-white drop-shadow-lg">Mirror Methodology</h1>
        <p className="text-2xl text-cyan-200 font-bold italic drop-shadow-md">"Look Closer: Decoding the Digital Reflection"</p>
      </header>

      <section className="space-y-6">
        <h2 className="text-3xl font-black text-white flex items-center gap-3">
          <span className="p-2 bg-blue-pool rounded-xl text-[#E05A9F] shadow-lg">01</span> Theoretical Core
        </h2>
        <div className="glass-premium p-10 rounded-[3rem] space-y-6 leading-relaxed shadow-xl border-2 border-white/40">
          <p className="text-xl font-medium text-white">
            The Digital Reflection Audit utilizes the <strong>Przybylski et al. (2013) FOMO Scale</strong> as its psychological anchor. 
            Fear of Missing Out is reflected here as a pervasive apprehension that the digital world is moving without you.
          </p>
          <p className="text-lg text-white/90 italic drop-shadow-sm">
            This tool uses scenario-based behavioral proxies to capture habits often hidden from conscious self-reporting. It is designed to be a clear, non-judgmental mirror of your current digital state.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-white">Mirror Markers</h2>
          <ul className="space-y-6">
            <li className="glass-premium p-6 rounded-3xl border-l-8 border-cyan-400 shadow-lg">
              <strong className="block text-cyan-200 text-xl font-black uppercase mb-2">Surface Reactivity</strong>
              Measures the immediate emotional shimmer caused by digital absence.
            </li>
            <li className="glass-premium p-6 rounded-3xl border-l-8 border-white shadow-lg">
              <strong className="block text-white text-xl font-black uppercase mb-2">Refraction Loops</strong>
              Identifies how attention bends towards the device subconsciously.
            </li>
            <li className="glass-premium p-6 rounded-3xl border-l-8 border-yellow-300 shadow-lg">
              <strong className="block text-yellow-200 text-xl font-black uppercase mb-2">Volitional Depth</strong>
              The clarity between intended engagement and accidental immersion.
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-black text-white">Diagnostic Engine</h2>
          <div className="glass-premium p-10 rounded-[3rem] h-full font-mono text-sm space-y-6 shadow-xl border-2 border-white/40">
            <div className="p-5 bg-black/10 rounded-2xl border border-white/20">
              <span className="text-cyan-300 font-bold">// REFLECTION WEIGHTS</span><br/>
              High Distortion: 3.0 pts<br/>
              Moderate Bend: 2.0 pts<br/>
              Minor Ripple: 1.0 pts<br/>
              Clear State: 0.0 pts
            </div>
            <div className="p-5 bg-black/10 rounded-2xl border border-white/20">
              <span className="text-yellow-200 font-bold">// PROJECTION TIERS</span><br/>
              0-8: Balanced (Clear)<br/>
              9-17: Immersion (Distorted)<br/>
              18-24: Compulsion (Fragmented)
            </div>
            <p className="text-white/70 text-xs uppercase font-bold tracking-widest leading-relaxed">
              Mirror projections are synthesized via Gemini AI to provide context to the quantitative reflection.
            </p>
          </div>
        </div>
      </section>

      <footer className="pt-12 border-t-2 border-white/30 flex justify-between items-center opacity-70">
        <span className="text-xs font-black uppercase tracking-widest text-white">Mirror Protocol v6.0</span>
        <span className="text-xs font-black uppercase tracking-widest text-white">Pink Research Standard</span>
      </footer>
    </div>
  );
};

export default Methodology;
