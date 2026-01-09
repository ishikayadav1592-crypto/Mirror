
import React, { useState, useEffect } from 'react';
import { UserState, QuizResults, AppView } from './types';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import Methodology from './components/Methodology';
import Settings from './components/Settings';
import CreatorPortal from './components/CreatorPortal';
import { APP_NAME } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('pulse_user_state');
    return saved ? JSON.parse(saved) : { hasCompletedQuiz: false, results: null };
  });

  useEffect(() => {
    localStorage.setItem('pulse_user_state', JSON.stringify(userState));
  }, [userState]);

  const handleQuizComplete = (results: QuizResults) => {
    setUserState({ hasCompletedQuiz: true, results });
    setView('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-400 selection:text-white">
      <nav className="p-6 flex justify-between items-center glass-premium sticky top-0 z-50 border-b border-white/30 shadow-xl backdrop-blur-3xl">
        <div 
          className="text-2xl font-extrabold text-white cursor-pointer tracking-tighter flex items-center gap-2 group"
          onClick={() => setView('landing')}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-pool flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <span className="text-[#E05A9F] text-xs font-black">M</span>
          </div>
          {APP_NAME}
        </div>
        <div className="flex gap-4 sm:gap-10 items-center">
          <button 
            onClick={() => setView('methodology')}
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'methodology' ? 'text-cyan-300' : 'text-white/70 hover:text-white'}`}
          >
            Philosophy
          </button>
          <button 
            onClick={() => setView('settings')}
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'settings' ? 'text-cyan-300' : 'text-white/70 hover:text-white'}`}
          >
            Vault
          </button>
          {userState.hasCompletedQuiz && (
            <button 
              onClick={() => setView('dashboard')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'dashboard' ? 'bg-blue-pool text-slate-900 shadow-lg shadow-cyan-500/30' : 'text-white/70 hover:text-white'}`}
            >
              Reflection
            </button>
          )}
          <button 
            onClick={() => setView('quiz')}
            className="px-6 py-2.5 rounded-xl bg-white text-[#E05A9F] text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            {userState.hasCompletedQuiz ? 'Re-Reflect' : 'Look Closer'}
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col overflow-x-hidden relative">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-white/15 blur-[150px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-400/15 blur-[120px] rounded-full -z-10" />

        {view === 'landing' && (
          <div className="max-w-5xl mx-auto px-6 py-24 text-center space-y-16 animate-in fade-in zoom-in duration-1000">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-premium border-white/40 text-cyan-300 text-xs font-black tracking-[0.3em] uppercase shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Mirror Reflection v7.0
            </div>
            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85] text-white drop-shadow-2xl">
              SEE YOUR <br />
              <span className="gradient-text">DIGITAL SELF</span>
            </h1>
            <p className="text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-sm">
              An elegant behavioral mirror capturing the subtle refractions between intentional focus and compulsive checking loops.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-6">
              <button 
                onClick={() => setView('quiz')}
                className="px-12 py-6 bg-white text-[#E05A9F] rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-2xl uppercase tracking-tighter"
              >
                Start Reflection
              </button>
              <button 
                onClick={() => setView('methodology')}
                className="px-12 py-6 glass-premium hover:bg-white/20 rounded-2xl font-black text-xl transition-all uppercase tracking-tighter border-white/35"
              >
                The Theory
              </button>
            </div>
          </div>
        )}

        {view === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
        {view === 'dashboard' && userState.results && <Dashboard results={userState.results} onReset={() => setView('quiz')} />}
        {view === 'methodology' && <Methodology />}
        {view === 'settings' && <Settings userResults={userState.results} onCreatorAccess={() => setView('creator')} />}
        {view === 'creator' && <CreatorPortal onExit={() => setView('settings')} />}
      </main>

      <footer className="p-8 text-center text-white/50 text-[10px] font-bold uppercase tracking-[0.5em]">
        Mirror Protocol &bull; Reflection Data Stored in Secure Vault
      </footer>
    </div>
  );
};

export default App;
