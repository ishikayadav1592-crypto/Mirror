
import React, { useState, useEffect } from 'react';
import { QUESTIONS, CHAPTERS } from '../constants';
import { QuizResults, FOMOLevel } from '../types';
import { submitToResearchLogs } from '../dataService';

interface QuizProps {
  onComplete: (results: QuizResults) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showChapterIntro, setShowChapterIntro] = useState(true);
  const [timer, setTimer] = useState(10);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);

  const question = QUESTIONS[currentIdx];
  const currentChapter = CHAPTERS.find(c => c.id === question.construct.toLowerCase()) || CHAPTERS[0];

  useEffect(() => {
    if (!showChapterIntro) {
      setTimer(10);
      const interval = setInterval(() => {
        setTimer(t => (t > 0 ? t - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentIdx, showChapterIntro]);

  const handleSelect = (points: number, idx: number) => {
    if (selectedOptionIdx !== null) return;
    
    setSelectedOptionIdx(idx);
    const newAnswers = { ...answers, [question.id]: points };
    setAnswers(newAnswers);
    
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        const nextIdx = currentIdx + 1;
        setSelectedOptionIdx(null);
        if (nextIdx < QUESTIONS.length) {
          const nextQ = QUESTIONS[nextIdx];
          if (nextQ.construct.toLowerCase() !== question.construct.toLowerCase()) {
            setShowChapterIntro(true);
          }
          setCurrentIdx(nextIdx);
          setIsTransitioning(false);
        } else {
          calculateAndFinish(newAnswers);
        }
      }, 350);
    }, 450);
  };

  const calculateAndFinish = async (finalAnswers: Record<string, number>) => {
    const totalScore = Object.values(finalAnswers).reduce((sum, val) => sum + val, 0);
    const breakdown = {
      emotional: (finalAnswers['q1'] || 0) + (finalAnswers['q2'] || 0),
      compulsive: (finalAnswers['q3'] || 0) + (finalAnswers['q4'] || 0),
      control: (finalAnswers['q5'] || 0) + (finalAnswers['q6'] || 0),
      awareness: (finalAnswers['q7'] || 0) + (finalAnswers['q8'] || 0),
    };
    
    // Max score is 24 (8 questions * 3 pts)
    let level: FOMOLevel = 'Low';
    if (totalScore >= 16) level = 'High';
    else if (totalScore >= 8) level = 'Moderate';

    const results: QuizResults = { totalScore, level, breakdown, answers: finalAnswers };
    await submitToResearchLogs(results);
    onComplete(results);
  };

  if (showChapterIntro) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center animate-in fade-in zoom-in duration-500">
        <h3 className="text-cyan-400 font-black tracking-[0.3em] uppercase mb-4">Refraction Wave</h3>
        <h2 className="text-5xl font-black mb-6 text-white leading-tight drop-shadow-md">{currentChapter.title}</h2>
        <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-md mx-auto drop-shadow-sm">{currentChapter.description}</p>
        <button 
          onClick={() => setShowChapterIntro(false)}
          className="px-14 py-6 bg-cyan-400 hover:bg-cyan-300 text-slate-900 rounded-2xl font-black text-2xl transition transform hover:scale-105 shadow-2xl uppercase tracking-tighter"
        >
          Look Into the Lens
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 w-full">
      <div className="mb-14 flex justify-between items-end">
        <div className="space-y-2">
          <div className="text-[10px] font-black text-white/70 uppercase tracking-[0.4em]">Response Window</div>
          <div className="h-2 w-48 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${timer < 3 ? 'bg-yellow-400' : 'bg-cyan-400'}`}
              style={{ width: `${(timer / 10) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black text-white/70 uppercase tracking-[0.4em]">Reflection ID</div>
          <div className="text-3xl font-black text-cyan-300 tabular-nums">{currentIdx + 1}<span className="text-white/30 text-xl ml-1">/ {QUESTIONS.length}</span></div>
        </div>
      </div>

      <div className={`transition-all duration-300 transform ${isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-xl text-balance">
            {question.text}
          </h2>
        </div>

        <div className="grid gap-5">
          {question.options.map((option, idx) => {
            const isSelected = selectedOptionIdx === idx;
            return (
              <button
                key={idx}
                disabled={selectedOptionIdx !== null}
                onClick={() => handleSelect(option.points, idx)}
                className={`group flex items-center p-6 text-left rounded-3xl transition-all duration-300 border-2 relative overflow-hidden
                  ${isSelected ? 'animate-select z-10 scale-[1.02] border-white shadow-2xl shadow-cyan-500/20' : 'glass-premium border-white/20 hover:border-cyan-400/50 hover:translate-x-2'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black mr-6 transition-all duration-300 border-2 
                  ${isSelected ? 'bg-white text-cyan-600 border-white' : 'bg-white/10 text-white border-white/30 group-hover:bg-cyan-400 group-hover:text-slate-900 group-hover:border-white'}`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className={`flex-1 font-bold text-lg relative z-10 transition-colors duration-300 
                  ${isSelected ? 'text-slate-900' : 'text-white'}`}>
                  {option.label}
                </span>
                {isSelected && (
                  <div className="absolute right-8 text-2xl animate-pulse">
                    📸
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="mt-20 flex flex-col items-center gap-4 text-white/50">
        <div className="flex gap-1.5">
          {[...Array(QUESTIONS.length)].map((_, i) => (
            <div key={i} className={`h-1 w-6 rounded-full transition-colors ${i <= currentIdx ? 'bg-cyan-400' : 'bg-white/20'}`} />
          ))}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Processing Reflection...</span>
      </div>
    </div>
  );
};

export default Quiz;
