
import React, { useState, useEffect } from 'react';
import { getBackendDatabase, deleteBackendRecord, clearBackend } from '../dataService';
import { BackendDatabase, QuizResults } from '../types';

interface CreatorPortalProps {
  onExit: () => void;
}

const CreatorPortal: React.FC<CreatorPortalProps> = ({ onExit }) => {
  const [db, setDb] = useState<BackendDatabase>({ records: [] });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setDb(getBackendDatabase());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Permanently delete this reflection record?")) {
      deleteBackendRecord(id);
      setDb(getBackendDatabase());
    }
  };

  const handlePurge = () => {
    if (confirm("WARNING: This will permanently delete ALL data in the backend. Continue?")) {
      clearBackend();
      setDb({ records: [] });
    }
  };

  const filteredRecords = db.records.filter(r => 
    r.level.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.id?.includes(searchTerm)
  );

  const exportCSV = () => {
    const headers = ["ID", "Timestamp", "Level", "Total Score", "Emotional", "Compulsive", "Control"];
    const rows = db.records.map(r => [
      r.id,
      r.timestamp,
      r.level,
      r.totalScore,
      r.breakdown.emotional,
      r.breakdown.compulsive,
      r.breakdown.control
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mirror_backend_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 animate-in fade-in slide-in-from-top-10 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-yellow-400 pb-8 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <span className="px-3 py-1 bg-yellow-400 text-slate-900 text-[10px] font-black uppercase rounded-lg">Admin Override</span>
             <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Creator Nexus</h1>
          </div>
          <p className="text-xl text-yellow-200 font-bold italic">Central Behavioral Archive | Global Dataset</p>
        </div>
        <div className="flex gap-4">
           <button onClick={exportCSV} className="px-6 py-4 glass-premium border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Export Global CSV</button>
           <button onClick={handlePurge} className="px-6 py-4 bg-red-500/20 border-2 border-red-500 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Purge Database</button>
           <button onClick={onExit} className="px-10 py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Exit Portal</button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass-premium p-8 rounded-3xl border-l-4 border-yellow-400 shadow-xl">
           <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-2">Total Reflections</div>
           <div className="text-5xl font-black text-white">{db.records.length}</div>
        </div>
        <div className="glass-premium p-8 rounded-3xl border-l-4 border-cyan-400 shadow-xl">
           <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-2">Avg. Score</div>
           <div className="text-5xl font-black text-white">
              {db.records.length > 0 
                ? (db.records.reduce((s, r) => s + r.totalScore, 0) / db.records.length).toFixed(1) 
                : "0.0"}
           </div>
        </div>
        <div className="glass-premium p-8 rounded-3xl border-l-4 border-pink-400 shadow-xl">
           <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-2">High Intensity %</div>
           <div className="text-5xl font-black text-white">
              {db.records.length > 0 
                ? Math.round((db.records.filter(r => r.level === 'High').length / db.records.length) * 100) 
                : "0"}%
           </div>
        </div>
        <div className="glass-premium p-8 rounded-3xl border-l-4 border-green-400 shadow-xl">
           <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-2">System Health</div>
           <div className="text-2xl font-black text-green-400 flex items-center gap-2">
             <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
             ONLINE
           </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
             <span className="text-3xl">🗄️</span> Records Registry
          </h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Filter by intensity or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/30 border-2 border-white/20 rounded-2xl px-6 py-3 text-white text-sm font-mono w-64 focus:border-yellow-400 focus:outline-none placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="glass-premium rounded-[2.5rem] overflow-hidden border-2 border-white/20 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10 border-b-2 border-white/10">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/60">Timestamp</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/60">Intensity</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/60">Score</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/60">Breakdown (E/H/C)</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/60 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? filteredRecords.slice().reverse().map((record, idx) => (
                  <tr key={record.id || idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-6 font-mono text-xs text-white/70">{record.timestamp ? new Date(record.timestamp).toLocaleString() : 'N/A'}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                        ${record.level === 'High' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40' : 
                          record.level === 'Moderate' ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/40' : 
                          'bg-white/20 text-white border border-white/40'}`}>
                        {record.level}
                      </span>
                    </td>
                    <td className="p-6 font-black text-xl text-white">{record.totalScore}<span className="text-xs text-white/30 ml-1">/24</span></td>
                    <td className="p-6">
                       <div className="flex gap-2">
                          <span className="text-[10px] font-bold text-cyan-300">E:{record.breakdown.emotional}</span>
                          <span className="text-[10px] font-bold text-white">H:{record.breakdown.compulsive}</span>
                          <span className="text-[10px] font-bold text-yellow-300">C:{record.breakdown.control}</span>
                       </div>
                    </td>
                    <td className="p-6 text-right">
                       <button 
                        onClick={() => handleDelete(record.id!)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
                       >
                         🗑️
                       </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="space-y-4">
                        <div className="text-5xl grayscale">📂</div>
                        <div className="text-xl font-black text-white/30 uppercase tracking-[0.5em]">No records in archive</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-8 bg-yellow-400/10 rounded-3xl border-2 border-yellow-400/20 flex items-center gap-6">
        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-2xl animate-pulse">🔒</div>
        <div className="flex-1">
          <p className="text-sm font-black text-yellow-400 uppercase tracking-widest">Creator Nexus Protocol Active</p>
          <p className="text-xs text-white/60 leading-relaxed font-bold">This view provides root-level access to the Mirror behavioral dataset. Use responsibly. Data deletion is irreversible.</p>
        </div>
      </div>
    </div>
  );
};

export default CreatorPortal;
