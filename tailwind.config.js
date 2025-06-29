/** @type {import('tailwindcss').Config} */

import textStroke from 'tailwindcss-text-stroke'; // Importe le plugin

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // On ajoute des ombres de texte personnalisées pour l'effet de "flottement"
      textShadow: {
        'float': '0 4px 15px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    textStroke, // Ajoute le plugin ici
    // Plugin pour utiliser les ombres de texte avec une classe utilitaire
    function ({ theme, e, addUtilities }) {
      const textShadows = theme('textShadow');
      const utilities = Object.entries(textShadows).map(([key, value]) => ({
        [`.text-shadow-${e(key)}`]: { textShadow: value },
      }));
      addUtilities(utilities);
    },
    require('@tailwindcss/container-queries'),
  ],
}