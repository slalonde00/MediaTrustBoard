import React, { useState } from 'react';
import { Search, ShieldCheck, Globe, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { fetchMediaScores } from './services/api';

// --- COMPOSANT SCORE CARD ---
const ScoreCard = ({ title, score, unit, description, type }) => {
  // Logique de couleur dynamique basée sur le score
  const getScoreColor = (val) => {
    if (!val) return 'text-slate-400';
    if (typeof val === 'string') {
        if (['High', 'Very High', 'Reliable'].includes(val)) return 'text-trust-high';
        if (['Mixed', 'Medium'].includes(val)) return 'text-trust-medium';
        return 'text-trust-low';
    }
    if (val >= 80) return 'text-trust-high';
    if (val >= 50) return 'text-trust-medium';
    return 'text-trust-low';
  };

  const colorClass = getScoreColor(score);

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-100 hover:shadow-trust-xl transition-all duration-300 group">
      <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2 group-hover:text-brand-primary transition-colors">
        {title}
      </h3>
      <div className="flex items-baseline gap-1 mb-1">
        <span className={`text-3xl font-black ${colorClass}`}>
          {score || "---"}
        </span>
        <span className="text-slate-400 font-medium text-sm">{unit}</span>
      </div>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      
      {!score && (
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-[10px] text-trust-medium font-semibold italic">
          <AlertTriangle size={12} /> EN ATTENTE D'API
        </div>
      )}
    </div>
  );
};

// --- COMPOSANT PRINCIPAL APP ---
function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setIsLoading(true);
    
    try {
      const domain = query.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
      const data = await fetchMediaScores(domain);
      setResults({ domain, ...data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-light">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <ShieldCheck size={24} />
          </div>
          <span className="font-black text-slate-800 tracking-tighter text-2xl">
            Veritas<span className="text-brand-primary">Hub</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
          <a href="#logic" className="hover:text-brand-primary transition-colors">Méthodologie</a>
          <a href="#api" className="hover:text-brand-primary transition-colors">API Status</a>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow hero-gradient px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Vérifiez la <span className="text-brand-primary">Fiabilité</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Consultez les scores d'intégrité journalistique et de fact-checking 
            historique pour n'importe quelle organisation média.
          </p>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-16 group">
            <input
              type="text"
              className="w-full p-6 pl-16 text-lg bg-white border-2 border-slate-200 rounded-3xl shadow-trust-xl search-focus-ring outline-none transition-all"
              placeholder="Saisissez un domaine (ex: lemonde.fr)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute left-6 top-6 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={28} />
            <button 
              type="submit"
              className="absolute right-3 top-3 bg-brand-primary text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-brand-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
            >
              Analyser
            </button>
          </form>

          {/* RESULTS AREA */}
          {isLoading ? (
            <div className="flex flex-col items-center py-20 animate-pulse">
              <div className="w-16 h-16 border-4 border-brand-light border-t-brand-primary rounded-full animate-spin"></div>
              <p className="mt-6 text-slate-500 font-bold tracking-widest uppercase text-xs">Synchronisation API...</p>
            </div>
          ) : results && (
            <div className="animate-in text-left">
              <div className="glass-card p-8 rounded-3xl mb-8 flex items-center justify-between border-l-8 border-l-brand-primary">
                <div className="flex items-center gap-6">
                  <div className="bg-brand-light p-4 rounded-2xl text-brand-primary">
                    <Globe size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">{results.domain}</h2>
                    <p className="text-slate-500 font-medium">Analyse consolidée des partenaires de confiance</p>
                  </div>
                </div>
                <CheckCircle2 className="text-trust-high hidden md:block" size={48} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ScoreCard 
                  title="NewsGuard" 
                  score={results.newsGuard} 
                  unit="/100" 
                  description="Note basée sur 9 critères de rigueur journalistique." 
                />
                <ScoreCard 
                  title="Ad Fontes" 
                  score={results.adFontes} 
                  unit="pts" 
                  description="Positionnement sur la charte de fiabilité médiatique." 
                />
                <ScoreCard 
                  title="MBFC Accuracy" 
                  score={results.mbfc} 
                  unit="" 
                  description="Historique des rapports de fact-checking échoués." 
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-white text-xs font-bold">V</div>
               <span className="font-bold text-white tracking-tight">VeritasHub</span>
            </div>
            <p className="text-sm max-w-sm">
              Plateforme indépendante d'agrégation de données de fiabilité média. 
              Nous ne modifions pas les scores originaux de nos partenaires.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-6">
            {['NewsGuard', 'Ad Fontes', 'MBFC'].map(partner => (
              <span key={partner} className="text-[10px] font-black uppercase tracking-[0.2em] border border-slate-800 px-3 py-1 rounded">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
