// src/config/templates.ts

import type { TemplateId } from '../types';

export interface Template {
  id: TemplateId;
  name: string; // Nom affiché à l'utilisateur
  // Classes Tailwind pour le conteneur extérieur de la carte
  outerClassName: string; 
  // Classes pour le conteneur intérieur
  innerClassName: string; 
}

export const TEMPLATES: Template[] = [
  {
    id: 'pokemon',
    name: 'Pokémon',
    outerClassName: 'p-2 bg-gradient-to-br from-yellow-300 to-orange-400',
    innerClassName: 'bg-slate-50',
  },
  {
    id: 'aurora',
    name: 'Aurore',
    // On utilise la syntaxe `bg-[url(...)]` de Tailwind pour les images de fond !
    outerClassName: "p-2 bg-cover bg-center bg-[url('/templates/aurora.jpg')]",
    innerClassName: 'bg-white/70 backdrop-blur-sm', // Fond blanc semi-transparent avec un effet de flou
  },
  {
    id: 'dark',
    name: 'Sombre',
    outerClassName: "p-2 bg-cover bg-center bg-[url('/templates/dark-grid.svg')]",
    innerClassName: 'bg-gray-800/80 backdrop-blur-sm',
  },
  {
    id: 'minimalist',
    name: 'Minimaliste',
    outerClassName: 'p-1 bg-gray-300',
    innerClassName: 'bg-white',
  },
    {
    id: 'holographic',
    name: 'Holographic',
    // On utilise la syntaxe `bg-[url(...)]` de Tailwind pour les images de fond !
    outerClassName: "p-2 bg-cover bg-center bg-[url('/templates/holographic.jpg')]",
    innerClassName: 'bg-white/70 backdrop-blur-sm', // Fond blanc semi-transparent avec un effet de flou
  },
];