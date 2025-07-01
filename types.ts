// src/types.ts
export type TemplateId = 'classic' | 'aurora' | 'holographic' | 'silver' | 'dark' | 'blue';

export interface SkillCategory {
  id: string; // Pour les keys React, un ID unique
  category: string;
  skills: string;
}

export interface HighlightedRepo {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
}

export interface CardData {
  name: string;
  githubUser: string;
  avatarUrl: string;
  bio: string;
  location: string;
  followers: number;
  publicRepos: number;
  totalStars: number; // Tu l'as déjà, c'est super !
  topLanguages: string[];
  totalContributions: number;
  
  // ON REMPLACE customSkills PAR ÇA :
  highlightedRepos: HighlightedRepo[];
  contributionsLastYear: number;

  template: 'holographic' | string; // Garde tes templates
}

// Type pour la réponse de l'API des dépôts
export interface GitHubRepo {
  language: string | null;
  stargazers_count: number;
}