// src/utils/projectTypeHelper.ts
import { FaReact, FaDatabase, FaGlobe, FaMobileAlt, FaCode, FaRobot, FaGamepad, FaCogs } from 'react-icons/fa';
import type { IconType } from 'react-icons';

// On définit les mots-clés qui vont nous aider à classifier les projets
const projectTypeKeywords: { [key: string]: string[] } = {
  web: ['react', 'vue', 'angular', 'nextjs', 'vite', 'tailwind', 'css', 'html', 'django', 'flask', 'rails', 'express', 'webapp', 'website', 'portfolio', 'frontend', 'backend', 'fullstack'],
  mobile: ['android', 'ios', 'flutter', 'react-native', 'swift', 'kotlin', 'xamarin', 'mobile'],
  database: ['database', 'sql', 'mongodb', 'postgres', 'mysql', 'firebase', 'db', 'orm'],
  api: ['api', 'rest', 'graphql', 'microservice', 'server'],
  ml_ai: ['tensorflow', 'pytorch', 'scikit-learn', 'keras', 'machine-learning', 'ai', 'neural-network', 'nlp'],
  game: ['unity', 'unreal', 'game', 'gamedev', 'phaser', 'godot'],
  tooling: ['cli', 'tool', 'script', 'automation', 'config', 'dotfiles', 'library', 'sdk', 'framework'],
};

// On associe chaque type à une icône
const projectTypeIcons: { [key: string]: IconType } = {
  web: FaGlobe,
  mobile: FaMobileAlt,
  database: FaDatabase,
  api: FaCogs, // Icône pour "rouages", "backend"
  ml_ai: FaRobot,
  game: FaGamepad,
  tooling: FaCode,
};

export const getProjectTypeIcon = (repoName: string, description: string | null): IconType => {
  const searchText = `${repoName.toLowerCase()} ${description?.toLowerCase() || ''}`;

  for (const type in projectTypeKeywords) {
    if (projectTypeKeywords[type].some(keyword => searchText.includes(keyword))) {
      return projectTypeIcons[type];
    }
  }

  // Si on ne trouve rien, on renvoie une icône par défaut
  return FaCode;
};