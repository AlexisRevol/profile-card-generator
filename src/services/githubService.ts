// src/services/githubService.ts

import type { CardData, GitHubRepo } from '../types';

// Un type pour la réponse de l'API /users/{username}
// On ne type que ce dont on a besoin
interface GitHubUserResponse {
  name: string;
  login: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  followers: number;
  public_repos: number;
  repos_url: string;
}

export const fetchGithubUserData = async (username: string): Promise<CardData> => {
  // --- Étape 1: Récupérer les informations de l'utilisateur ---
  const userResponse = await fetch(`https://api.github.com/users/${username}`);
  if (!userResponse.ok) {
    throw new Error('Utilisateur GitHub non trouvé.');
  }
  const userData: GitHubUserResponse = await userResponse.json();

  // --- Étape 2: Récupérer tous les dépôts de l'utilisateur ---
  // On ajoute "?per_page=100" pour récupérer un maximum de dépôts en une seule requête
  const reposResponse = await fetch(`${userData.repos_url}?per_page=100`);
  if (!reposResponse.ok) {
    throw new Error('Impossible de récupérer les dépôts.');
  }
  const reposData: GitHubRepo[] = await reposResponse.json();

  // --- Étape 3: Calculer les statistiques (étoiles et langages) ---
  let totalStars = 0;
  const langStats: { [key: string]: number } = {};

  for (const repo of reposData) {
    totalStars += repo.stargazers_count;
    if (repo.language) {
      langStats[repo.language] = (langStats[repo.language] || 0) + 1;
    }
  }

  // Trier les langages par popularité et prendre les 5 premiers
  const topLanguages = Object.entries(langStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0]);

  // --- Étape 4: Formater les données pour notre application ---
  const formattedData: CardData = {
    name: userData.name || userData.login,
    githubUser: userData.login,
    avatarUrl: userData.avatar_url,
    bio: userData.bio || 'Passionné(e) de code et de nouvelles technologies.',
    location: userData.location || 'Quelque part sur Terre',
    followers: userData.followers,
    publicRepos: userData.public_repos,
    totalStars: totalStars,
    topLanguages: topLanguages,
    template: 'holographic', // Valeur par défaut
    customSkills: [
        { id: '1', category: 'Développement Web', skills: 'React, TypeScript, Node.js' },
        { id: '2', category: 'Outils & Design', skills: 'Figma, Git, Tailwind CSS' },
    ],
  };

  return formattedData;
};