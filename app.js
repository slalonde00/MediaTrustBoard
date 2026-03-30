import React from 'react';
import TrustDashboard from './components/TrustDashboard'; // Assurez-vous que le chemin est correct

function App() {
  return (
    <div className="App">
      {/* Barre de navigation simple pour le branding */}
      <nav className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black italic">
            V
          </div>
          <span className="font-bold text-slate-800 tracking-tight text-xl">
            Veritas<span className="text-blue-600">Hub</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
          <a href="#about" className="hover:text-blue-600 transition-colors">Méthodologie</a>
          <a href="#partners" className="hover:text-blue-600 transition-colors">Partenaires API</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Composant Principal de Recherche et d'Affichage des Scores */}
      <main>
        <TrustDashboard />
      </main>

      {/* Footer informatif (important pour la transparence des données) */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm mb-4">
            Données agrégées via les protocoles standards de fact-checking. 
            Les scores affichés sont la propriété exclusive de leurs émetteurs respectifs.
          </p>
          <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-xs font-bold uppercase tracking-widest text-white">NewsGuard</span>
            <span className="text-xs font-bold uppercase tracking-widest text-white">Ad Fontes Media</span>
            <span className="text-xs font-bold uppercase tracking-widest text-white">Media Bias/Fact Check</span>
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-tighter">
            © 2026 VeritasHub Project - Pour une information transparente.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
