import React, { useState } from 'react';
import { Search, ShieldCheck, BarChart3, ExternalLink } from 'lucide-react';

const MediaTrustDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Simulation des données compilées
  const mediaData = [
    {
      id: 1,
      name: "Reuters",
      mbfc: { rating: "Very High", bias: "Center" },
      adFontes: { reliability: 48.5, bias: "Neutral" },
      newsGuard: 100,
      theFactual: 82,
      url: "reuters.com"
    },
    {
      id: 2,
      name: "BBC News",
      mbfc: { rating: "High", bias: "Center-Left" },
      adFontes: { reliability: 44.2, bias: "Middle" },
      newsGuard: 95,
      theFactual: 78,
      url: "bbc.com"
    },
    {
      id: 3,
      name: "The New York Times",
      mbfc: { rating: "High", bias: "Left-Center" },
      adFontes: { reliability: 42.1, bias: "Left-Leaning" },
      newsGuard: 100,
      theFactual: 75,
      url: "nytimes.com"
    }
  ];

  const filteredMedia = mediaData.filter(media =>
    media.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="text-blue-600" /> Index de Crédibilité Média
        </h1>
        <p className="text-slate-600">Compilation des scores de fact-checking et de fiabilité.</p>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher une organisation (ex: Reuters, BBC...)"
          className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredMedia.map(media => (
          <div key={media.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-slate-800">{media.name}</h2>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                {media.url} <ExternalLink size={14} />
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* NewsGuard */}
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-xs font-semibold uppercase text-blue-600 mb-1">NewsGuard</p>
                <p className="text-2xl font-bold">{media.newsGuard}/100</p>
              </div>

              {/* Media Bias/Fact Check */}
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-xs font-semibold uppercase text-green-600 mb-1">MBFC Accuracy</p>
                <p className="text-lg font-bold text-green-800">{media.mbfc.rating}</p>
              </div>

              {/* Ad Fontes */}
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-xs font-semibold uppercase text-purple-600 mb-1">Ad Fontes Score</p>
                <p className="text-2xl font-bold">{media.adFontes.reliability}</p>
              </div>

              {/* The Factual */}
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <p className="text-xs font-semibold uppercase text-orange-600 mb-1">The Factual</p>
                <p className="text-2xl font-bold">{media.theFactual}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaTrustDashboard;
