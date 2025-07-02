// src/config/templates.ts

import type { TemplateId } from '@/types';

export interface Template {
  id: TemplateId;
  name: string; // Nom affiché à l'utilisateur
  // Classes Tailwind pour le conteneur extérieur de la carte
  outerClassName: string; 
  // Classes pour le conteneur intérieur
  innerClassName: string; 
  theme: 'light' | 'dark';
  badgeColors: BadgeColors;
}

export interface BadgeColors {
  text: string;
  borderOuter: string;
  borderInner: string;
  backgroundGradientId: string; 
}

export const TEMPLATES: Template[] = [
  {
    id: 'classic',
    name: 'Classic',
    outerClassName: 'p-2 bg-gradient-to-br from-yellow-300 to-orange-400',
    innerClassName: 'bg-slate-50',
    theme: 'light',
    // NOUVEAU : Couleurs spécifiques pour le thème "classic"
    badgeColors: {
      text: '#374151',
      borderOuter: 'rgba(0, 0, 0, 0.15)',
      borderInner: 'rgba(255, 255, 255, 0.7)',
      backgroundGradientId: 'badge-bg-light', // <-- On spécifie quel dégradé utiliser
    },
  },
  {
    id: 'holographic',
    name: 'Holo',
    // On utilise la syntaxe `bg-[url(...)]` de Tailwind pour les images de fond !
    outerClassName: "p-2 bg-cover bg-center bg-[url('/templates/holographic.jpg')]",
    innerClassName: 'bg-white/70 backdrop-blur-sm', // Fond blanc semi-transparent avec un effet de flou
     theme: 'light',
     badgeColors: {
      text: 'rgba(0, 0, 0, 0.15)',
      borderOuter: 'rgba(192, 132, 252, 0.4)',
      borderInner: 'rgba(56, 189, 248, 0.3)',
      backgroundGradientId: 'badge-bg-holographic', // <-- On spécifie le dégradé spécial
    },
  },
  {
    id: 'blue',
    name: 'Silver',
    // On utilise la syntaxe `bg-[url(...)]` de Tailwind pour les images de fond !
    outerClassName: "p-2 bg-cover bg-center bg-[url('/templates/blue.jpg')]",
    innerClassName: 'bg-white/90 backdrop-blur-sm', // Fond blanc semi-transparent avec un effet de flou
    theme: 'light',
    badgeColors: {
      text: '#374151',
      borderOuter: 'rgba(0, 0, 0, 0.15)',
      borderInner: 'rgba(255, 255, 255, 0.7)',
      backgroundGradientId: 'badge-bg-light', // Le thème bleu peut réutiliser le dégradé sombre
    },
  },
  {
    id: 'dark',
    name: 'Dark',
    outerClassName: "p-2 bg-cover bg-center bg-[url('/templates/dark.jpg')]",
    innerClassName: 'bg-gray-800/85 backdrop-blur-sm',
     theme: 'dark',
     badgeColors: {
      text: '#D1D5DB',
      borderOuter: 'rgba(255, 255, 255, 0.2)',
      borderInner: 'rgba(0, 0, 0, 0.25)',
      backgroundGradientId: 'badge-bg-dark', // <-- On spécifie quel dégradé utiliser
    },
  },
];