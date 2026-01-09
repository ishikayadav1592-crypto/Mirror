
import React, { useState } from 'react';
import { getWebhookUrl, setWebhookUrl } from '../dataService';
import { QuizResults } from '../types';

interface SettingsProps {
  userResults: QuizResults | null;
  onCreatorAccess: () => void;
}

const Settings: React.FC<SettingsProps> = ({ userResults, onCreatorAccess }) => {
  const [url, setUrl] = useState(getWebhookUrl());
  const [showCopied, setShowCopied] = useState(false);
  const [creatorCode, setCreatorCode] = useState("");
  const [authError, setAuthError] = useState(false);

  const handleSave = () => {
    setWebhookUrl(url);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleCreatorLogin = () => {
    // Identity Token Verification
    if (creatorCode === "MIRROR-2025") {
      onCreatorAccess();
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const exportJson = () => {
    if (!userResults) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userResults, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `mirror_vault_${new Date().toISOString().slice(0,10)}.json`);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <header className="space-y-4 border-b-4 border-white/40 pb-8">
        <h1 className="text-5xl font-black text-white drop-shadow-lg uppercase tracking-tighter">Reflection Vault</h1>
        <p className="text-xl text-cyan-200 font-bold italic">Manage your mirror data and research connectivity.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Connection */}
        <div className="glass-premium p-10 rounded-[2.5rem] border-2 border-white/30 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📡</span>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Sync Tunnel</h2>
          </div>
          <p className="text-sm text-white/75 leading-relaxed">
            Link this instance to an external reflection log (Google Sheet) for research aggregation.
          </p>
          <div className="space-y-4">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/..."
              className="w-full bg-black/20 border-2 border-white/30 rounded-2xl px-6 py-4 text-white text-sm font-mono focus:border-cyan-400 focus:outline-none transition-all placeholder:text-white/40"
            />
            <button 
              onClick={handleSave}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${showCopied ? 'bg-green-500 text-white' : 'bg-cyan-400 text-slate-900 hover:scale-[1.02]'}`}
            >
              {showCopied ? 'Link Secured' : 'Update Connection'}
            </button>
          </div>
        </div>

        {/* Local Export */}
        <div className="glass-premium p-10 rounded-[2.5rem] border-2 border-white/30 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">💾</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Vault Download</h2>
            </div>
            <p className="text-sm text-white/75 leading-relaxed">
              Export the raw behavioral refractions captured in this session. Format: JSON.
            </p>
          </div>
          <button 
            disabled={!userResults}
            onClick={exportJson}
            className="w-full py-4 bg-white text-[#E05A9F] rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg"
          >
            {userResults ? 'Download Reflection' : 'Vault Empty'}
          </button>
        </div>
      </div>

      {/* Creator Authentication Section */}
      <div className="glass-premium p-10 rounded-[2.5rem] border-2 border-white/30 space-y-8 shadow-2xl relative">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
             <span className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center text-lg">🔑</span>
             Creator Access
          </h2>
          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Proprietary Nexus</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="password"
            value={creatorCode}
            onChange={(e) => setCreatorCode(e.target.value)}
            placeholder="Identity Token..."
            className={`flex-1 bg-black/40 border-2 ${authError ? 'border-red-500 animate-shake' : 'border-white/20'} rounded-2xl px-6 py-4 text-white font-mono focus:border-yellow-400 focus:outline-none transition-all placeholder:text-white/20`}
          />
          <button 
            onClick={handleCreatorLogin}
            className="px-10 py-4 bg-yellow-400 text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap"
          >
            Enter Creator Portal
          </button>
        </div>
      </div>

      <div className="p-8 bg-white/10 rounded-3xl border-2 border-white/20 text-center">
        <p className="text-xs text-white/70 font-black uppercase tracking-[0.3em]">
          Reflections are private and local until a sync tunnel is activated.
        </p>
      </div>
    </div>
  );
};

export default Settings;
