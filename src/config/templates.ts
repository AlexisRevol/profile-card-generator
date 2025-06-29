// src/config/templates.ts

import type { TemplateId } from '../types';

export interface Template {
  id: TemplateId;
  name: string; // Nom affiché à l'utilisateur
  // Classes Tailwind pour le conteneur extérieur de la carte
  outerClassName: string; 
  // Classes pour le conteneur intérieur
  innerClassName: string; 
  theme: 'light' | 'dark';
}

export const TEMPLATES: Template[] = [
  {
    id: 'classic',
    name: 'Classic',
    outerClassName: 'p-2 bg-gradient-to-br from-yellow-300 to-orange-400',
    innerClassName: 'bg-slate-50',
     theme: 'light',
  },
  {
    id: 'holographic',
    name: 'Holo',
    // On utilise la syntaxe `bg-[url(...)]` de Tailwind pour les images de fond !
    outerClassName: "p-2 bg-cover bg-center bg-[url('/templates/holographic.jpg')]",
    innerClassName: 'bg-white/70 backdrop-blur-sm', // Fond blanc semi-transparent avec un effet de flou
     theme: 'light',
  },
  {
    id: 'blue',
    name: 'Silver',
    // On utilise la syntaxe `bg-[url(...)]` de Tailwind pour les images de fond !
    outerClassName: "p-2 bg-cover bg-center bg-[url('/templates/blue.jpg')]",
    innerClassName: 'bg-white/90 backdrop-blur-sm', // Fond blanc semi-transparent avec un effet de flou
     theme: 'light',
  },
  {
    id: 'dark',
    name: 'Dark',
    outerClassName: "p-2 bg-cover bg-center bg-[url('/templates/dark.jpg')]",
    innerClassName: 'bg-gray-800/85 backdrop-blur-sm',
     theme: 'dark',
  },
];