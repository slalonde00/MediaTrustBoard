import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, CheckCircle2, Globe, AlertCircle } from 'lucide-react';
import { fetchMediaScores } from '../services/api';

const TrustDashboard = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    setError(null);

    try {
      // Nettoyage de l'URL (ex: https://reuters.com -> reuters.com)
      const domain = query.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
      const data = await fetchMediaScores(domain);
      setResults({ domain, ...data });
    } catch (err) {
      setError("Impossible de récupérer les données pour ce média.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Vérificateur de Fiabilité Média
          </h1>
          <p className="text-lg text-slate-600">
            Saisissez un nom de domaine pour voir son historique de fact-checking consolidé.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-10">
          <input
            type="text"
            className="w-full p-5 pl-14 text-lg bg-white border-2 border-slate-200 rounded-2xl shadow-xl focus:border-blue-500 focus:ring-0 transition-all outline-none"
            placeholder="Ex: lemonde.fr, nytimes.com..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-5 top-5 text-slate-400" size={24} />
          <button 
            type="submit"
            className="absolute right-3 top-3 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Analyser
          </button>
        </form>

        {/* Results Logic */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-500 font-medium">Interrogation des bases de données de fact-checking...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle /> {error}
          </div>
        )}

        {results && !isLoading && (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Result */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Globe size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">{results.domain}</h2>
                  <p className="text-slate-500 text-sm">Analyse en temps réel via partenaires certifiés</p>
                </div>
              </div>
              <CheckCircle2 className="text-green-500" size={32} />
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScoreCard 
                title="NewsGuard" 
                score={results.newsGuard} 
                unit="/100" 
                description="Intégrité journalistique" 
              />
              <ScoreCard 
                title="Ad Fontes" 
                score={results.adFontes} 
                unit="pts" 
                description="Fiabilité & Précision" 
              />
              <ScoreCard 
                title="MBFC" 
                score={results.mbfc} 
                unit="" 
                description="Historique de faits" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant Enfant : Carte de Score
const ScoreCard = ({ title, score, unit, description }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition-shadow">
    <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">{title}</h3>
    <div className="flex items-baseline gap-1 mb-1">
      <span className="text-3xl font-black text-slate-900">{score || "---"}</span>
      <span className="text-slate-400 font-medium">{unit}</span>
    </div>
    <p className="text-slate-500 text-sm">{description}</p>
    {!score && (
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-[10px] text-amber-600 font-semibold italic">
        <ShieldAlert size={12} /> EN ATTENTE DE CONTRAT API
      </div>
    )}
  </div>
);

export default TrustDashboard;
