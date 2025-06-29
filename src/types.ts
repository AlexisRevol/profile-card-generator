// src/types.ts
export type TemplateId = 'classic' | 'aurora' | 'holographic' | 'silver' | 'dark' | 'blue';

export interface CardData {
  // Informations de base
  name: string;
  githubUser: string;
  avatarUrl: string;
  bio: string; // On remplace "skills" par la bio, plus générique
  location: string;
  
  // Statistiques
  followers: number;
  publicRepos: number;
  totalStars: number;

  // Données calculées
  topLanguages: string[];

  // Personnalisation
  template: TemplateId;
}

// Type pour la réponse de l'API des dépôts
export interface GitHubRepo {
  language: string | null;
  stargazers_count: number;
}