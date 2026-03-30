// Configuration des points de terminaison (à remplir après signature des deals)
const API_CONFIG = {
  NEWSGUARD: { url: '', key: '' },
  AD_FONTES: { url: '', key: '' },
  MBFC: { url: '', key: '' }
};

export const fetchMediaScores = async (domain) => {
  try {
    // Note : En production, ces appels devraient idéalement passer par VOTRE propre backend
    // pour protéger vos clés d'API privées.
    
    // Simulations d'appels (vides pour l'instant)
    const [newsGuard, adFontes, mbfc] = await Promise.all([
      // fetch(`${API_CONFIG.NEWSGUARD.url}/score?domain=${domain}`, { headers: { 'Authorization': API_CONFIG.NEWSGUARD.key } }).then(res => res.json()),
      Promise.resolve({ score: null }), // Placeholder NewsGuard
      Promise.resolve({ reliability: null, bias: null }), // Placeholder Ad Fontes
      Promise.resolve({ rating: "Pending", bias: "Unknown" }) // Placeholder MBFC
    ]);

    return {
      newsGuard: newsGuard.score,
      adFontes: adFontes.reliability,
      mbfc: mbfc.rating
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des scores:", error);
    throw error;
  }
};
