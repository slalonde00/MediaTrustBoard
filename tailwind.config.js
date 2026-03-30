/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs de marque (Bleu professionnel)
        brand: {
          primary: '#2563eb', // Bleu vibrant
          dark: '#1e40af',
          light: '#dbeafe',
        },
        // Couleurs de statut pour la fiabilité
        trust: {
          high: '#10b981',   // Vert (Fiable)
          medium: '#f59e0b', // Ambre (Neutre/Attention)
          low: '#ef4444',    // Rouge (Peu fiable)
        }
      },
      boxShadow: {
        'trust-sm': '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'trust-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
