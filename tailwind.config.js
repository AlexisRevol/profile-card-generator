// tailwind.config.js

import textStroke from 'tailwindcss-text-stroke';
import containerQueries from '@tailwindcss/container-queries'; // Importez le plugin

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'float': '0 4px 15px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    textStroke,
    function ({ theme, e, addUtilities }) {
      const textShadows = theme('textShadow');
      const utilities = Object.entries(textShadows).map(([key, value]) => ({
        [`.text-shadow-${e(key)}`]: { textShadow: value },
      }));
      addUtilities(utilities);
    },
    containerQueries, // Utilisez la variable importée ici
  ],
}