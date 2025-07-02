export type TemplateId = 'classic' | 'aurora' | 'holographic' | 'silver' | 'dark' | 'blue';

export interface SkillCategory {
  id: string;
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
  totalStars: number;
  topLanguages: string[];
  
  highlightedRepos: HighlightedRepo[];
  contributionsLastYear: number;

  template: 'holographic' | string; 
}

export interface GitHubRepo {
  language: string | null;
  stargazers_count: number;
}