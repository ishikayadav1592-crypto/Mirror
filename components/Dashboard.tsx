
import React, { useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { QuizResults } from '../types';
import { getPersonalizedReflection } from '../geminiService';
import { getWebhookUrl } from '../dataService';

interface DashboardProps {
  results: QuizResults;
  onReset: () => void;
}

const MirrorLoader: React.FC = () => {
  const [loadingText, setLoadingText] = useState('Initiating Synthesis...');
  const phrases = [
    'Refining the Perspective...',
    'Focusing the Lens...',
    'Decoding Behavioral Nuance...',
    'Refining Digital Image...',
    'Finalizing Projection...'
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % phrases.length;
      setLoadingText(phrases[i]);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 py-10 animate-in fade-in duration-1000">
      <div className="relative w-48 h-48 rounded-full border-4 border-white/30 overflow-hidden glass-premium flex items-center justify-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-white/5 to-pink-500/10 animate-pulse" />
        <div className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-polish pointer-events-none" />
        <div className="grid grid-cols-4 gap-3 relative z-10">
          {[...Array(16)].map((_, i) => (
            <div 
              key={i} 
              className="w-2.5 h-2.5 bg-cyan-300 rounded-sm animate-shimmer-dot" 
              style={{ animationDelay: `${(i % 4 + Math.floor(i / 4)) * 0.15}s` }} 
            />
          ))}
        </div>
        <div className="absolute w-full h-[2px] bg-white/70 blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-scan pointer-events-none" />
      </div>

      <div className="text-center space-y-2">
        <div className="text-sm font-black uppercase tracking-[0.4em] text-cyan-300 animate-pulse min-h-[1.5em]">
          {loadingText}
        </div>
        <div className="text-[10px] text-white/70 font-bold uppercase tracking-[0.2em]">
          Mirror AI is generating your reflection
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ results, onReset }) => {
  const [reflection, setReflection] = useState<string>('');
  const [isLoadingReflection, setIsLoadingReflection] = useState(true);
  const [view, setView] = useState<'standard' | 'analytics'>('standard');
  const hasWebhook = !!getWebhookUrl();

  useEffect(() => {
    async function load() {
      setIsLoadingReflection(true);
      const text = await getPersonalizedReflection(results);
      setReflection(text || '');
      setIsLoadingReflection(false);
    }
    load();
  }, [results]);

  const radarData = [
    { subject: 'Affective', A: results.breakdown.emotional, fullMark: 6 },
    { subject: 'Habitual', A: results.breakdown.compulsive, fullMark: 6 },
    { subject: 'Volitional', A: results.breakdown.control, fullMark: 6 },
    { subject: 'Awareness', A: results.breakdown.awareness, fullMark: 6 },
  ];

  const trendData = [
    { name: 'Baseline', score: 1 },
    { name: 'Situational', score: results.breakdown.emotional },
    { name: 'Compulsion', score: results.breakdown.compulsive },
    { name: 'Control', score: results.breakdown.control },
  ];

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'High': return 'text-yellow-300';
      case 'Moderate': return 'text-cyan-300';
      default: return 'text-white';
    }
  };

  const exportRaw = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "mirror_reflection.json");
    dl.click();
    dl.remove();
  };

  if (view === 'analytics') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-500">
        <div className="flex justify-between items-end border-b border-white/30 pb-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white drop-shadow-md">Research Analytics</h1>
            <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Mirror Reflection Protocol | Behavioral Depth</p>
          </div>
          <div className="flex gap-4">
             <button onClick={exportRaw} className="px-6 py-3 glass-premium rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all shadow-lg border-white/20">Export Raw</button>
             <button onClick={() => setView('standard')} className="px-6 py-3 bg-white text-[#E05A9F] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg">Back to Mirror</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="h-px flex-1 bg-white/20"></div>
             <h2 className="text-xs font-black text-cyan-300 uppercase tracking-[0.4em] px-4 whitespace-nowrap">Construct Dimensions</h2>
             <div className="h-px flex-1 bg-white/20"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-premium p-8 rounded-3xl border-t-4 border-cyan-400 shadow-xl group hover:bg-white/20 transition-colors">
              <div className="text-xs text-white/70 font-black uppercase tracking-widest mb-3 flex justify-between items-center">
                Surface Reactivity
              </div>
              <div className="text-5xl font-black text-white">{(results.breakdown.emotional / 6 * 10).toFixed(1)}</div>
              <div className="text-[10px] text-cyan-300 font-bold uppercase mt-2 tracking-widest">Emotional Drift</div>
              <p className="text-[10px] text-white/70 mt-4 leading-relaxed font-bold">Sensitivity to social exclusion and digital non-responsiveness.</p>
            </div>

            <div className="glass-premium p-8 rounded-3xl border-t-4 border-white shadow-xl group hover:bg-white/20 transition-colors">
              <div className="text-xs text-white/70 font-black uppercase tracking-widest mb-3 flex justify-between items-center">
                Refractive Loop
              </div>
              <div className="text-5xl font-black text-white">{(results.breakdown.compulsive / 6 * 10).toFixed(1)}</div>
              <div className="text-[10px] text-white/90 font-bold uppercase mt-2 tracking-widest">Habitual Curvature</div>
              <p className="text-[10px] text-white/70 mt-4 leading-relaxed font-bold">Pre-conscious device engagement and phantom check frequency.</p>
            </div>

            <div className="glass-premium p-8 rounded-3xl border-t-4 border-yellow-400 shadow-xl group hover:bg-white/20 transition-colors">
              <div className="text-xs text-white/70 font-black uppercase tracking-widest mb-3 flex justify-between items-center">
                Depth Focus
              </div>
              <div className="text-5xl font-black text-white">{(10 - (results.breakdown.control / 6 * 10)).toFixed(1)}</div>
              <div className="text-[10px] text-yellow-300 font-bold uppercase mt-2 tracking-widest">Volitional Stability</div>
              <p className="text-[10px] text-white/70 mt-4 leading-relaxed font-bold">Capacity to self-regulate and maintain intended session boundaries.</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
           <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="glass-premium p-8 rounded-3xl border-l-8 border-white/50 shadow-xl h-full flex flex-col justify-center">
                <div className="text-xs text-white/70 font-black uppercase tracking-widest mb-2">Reflective Clarity</div>
                <div className="text-6xl font-black text-white leading-none">{Math.round((results.totalScore / 24) * 100)}%</div>
                <div className="text-[10px] text-cyan-300 font-bold uppercase mt-4 tracking-tighter">Aggregate Distortion Metric</div>
                <div className={`mt-6 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-center ${getLevelColor(results.level)} bg-white/20 border border-white/10`}>
                  {results.level} Reflection
                </div>
              </div>
           </div>

          <div className="lg:col-span-3 glass-premium p-10 rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/90 border-b border-white/10 pb-4">Reflective Behavioral Mapping</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff60" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff60" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,113,189,0.95)', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '24px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#00E5FF" fillOpacity={1} fill="url(#colorScore)" strokeWidth={5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10 w-full animate-in slide-in-from-bottom-8 duration-1000">
      <div className={`p-10 md:p-16 rounded-[3rem] border-4 border-white/40 glass-premium flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-50" />
        <div className="space-y-6 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/20 text-xs font-black tracking-[0.3em] uppercase text-white border border-white/40 backdrop-blur-md">
            <span className={`w-2 h-2 rounded-full ${hasWebhook ? 'bg-cyan-400 shadow-[0_0_8px_#00E5FF] animate-pulse' : 'bg-white/50'}`}></span>
            Reflection Complete
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
            <span className={getLevelColor(results.level)}>{results.level}</span> <br/> Intensity
          </h1>
          <p className="text-white text-xl font-medium max-w-md leading-relaxed drop-shadow-md">
            The Mirror reveals a {results.level.toLowerCase()} intensity across your primary digital constructs.
          </p>
          <button 
            onClick={() => setView('analytics')}
            className="flex items-center gap-3 text-white hover:text-cyan-200 font-black transition-all text-lg group/btn uppercase tracking-widest drop-shadow-md"
          >
            Open Reflection Analytics
            <span className="group-hover/btn:translate-x-3 transition-transform text-2xl">📊</span>
          </button>
        </div>
        
        <div className="h-64 w-64 relative flex items-center justify-center shrink-0">
          <div className={`absolute inset-0 rounded-full blur-[60px] opacity-40 animate-pulse ${results.level === 'High' ? 'bg-yellow-400' : results.level === 'Moderate' ? 'bg-cyan-400' : 'bg-white'}`}></div>
          <div className="text-7xl font-black text-white relative z-10 drop-shadow-2xl">{Math.round((results.totalScore / 24) * 100)}%</div>
          <svg className="absolute inset-0 w-full h-full -rotate-90 filter drop-shadow-2xl">
            <circle cx="128" cy="128" r="110" fill="none" stroke="currentColor" strokeWidth="18" className="text-white/20" />
            <circle cx="128" cy="128" r="110" fill="none" stroke="currentColor" strokeWidth="18" className={getLevelColor(results.level)} strokeDasharray={691} strokeDashoffset={691 - (691 * (results.totalScore / 24))} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
          </svg>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="glass-premium p-10 rounded-[3rem] space-y-8 flex flex-col h-full shadow-xl border-white/30">
          <h3 className="text-2xl font-black flex items-center gap-3 text-white">Refraction Analysis</h3>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#ffffff40" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff', fontSize: 13, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 6]} tick={false} axisLine={false} />
                <Radar name="Reflection" dataKey="A" stroke="#00E5FF" fill="#00E5FF" fillOpacity={0.4} strokeWidth={4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-premium p-10 rounded-[3rem] space-y-8 flex flex-col h-full shadow-xl border-4 border-white/40">
          <h3 className="text-2xl font-black flex items-center gap-3 text-white">The Mirror Speaks</h3>
          <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide min-h-[300px]">
            {isLoadingReflection ? (
              <MirrorLoader />
            ) : (
              <div className="text-white/95 leading-relaxed whitespace-pre-wrap text-xl font-medium italic drop-shadow-sm animate-in fade-in duration-1000">
                {reflection}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
        <button onClick={onReset} className="px-12 py-6 bg-white text-[#E05A9F] rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95 uppercase tracking-tighter">New Reflection</button>
        <button onClick={() => window.print()} className="px-12 py-6 glass-premium rounded-[2rem] font-black text-xl hover:bg-white/30 transition-all border-4 border-white/40 uppercase tracking-[0.2em] text-sm shadow-xl">Print Reflection</button>
      </div>
    </div>
  );
};

export default Dashboard;
