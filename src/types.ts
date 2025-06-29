// src/types.ts

export interface CardData {
  name: string;
  githubUser: string;
  avatarUrl: string;
  skills: string;
  technologies: string[];
  template: 'pokemon' | 'modern' | 'minimalist'; // On peut définir les modèles exacts
}