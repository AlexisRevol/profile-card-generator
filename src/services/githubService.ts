// src/services/githubService.ts

import type { CardData, GitHubRepo, HighlightedRepo } from '../types';

const GITHUB_API_URL = 'https://api.github.com/graphql';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

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

// La requête GraphQL qui va tout chercher d'un coup !
const GITHUB_USER_QUERY = `
  query GetUser($username: String!) {
    user(login: $username) {
      name
      login
      avatarUrl
      bio
      location
      followers {
        totalCount
      }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          stargazers {
            totalCount
          }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            nodes {
              name
            }
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
      pinnedItems(first: 3, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            stargazerCount
            forkCount
          }
        }
      }
    }
  }
`;

export async function fetchGithubUserData(username: string): Promise<CardData> {
  const response = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: GITHUB_USER_QUERY,
      variables: { username },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    console.error('Erreurs GraphQL:', errors);
    throw new Error('Utilisateur GitHub non trouvé ou erreur API.');
  }

  const user = data.user;
  if (!user) {
    throw new Error('Utilisateur GitHub non trouvé.');
  }

  // Calcul du total des étoiles et des langages
  let totalStars = 0;
  const langMap = new Map<string, number>();
  user.repositories.nodes.forEach((repo: any) => {
    totalStars += repo.stargazers.totalCount;
    repo.languages.nodes.forEach((lang: any) => {
      langMap.set(lang.name, (langMap.get(lang.name) || 0) + 1);
    });
  });
  const topLanguages = Array.from(langMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0]);

  // Traitement des dépôts mis en avant
  let highlightedRepos: HighlightedRepo[] = user.pinnedItems.nodes.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.url,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
  }));
  
  // FALLBACK: Si l'utilisateur n'a pas de dépôts épinglés, on prend ses 3 plus populaires
  if (highlightedRepos.length === 0) {
      const topStarredRepos = user.repositories.nodes.slice(0, 3);
      highlightedRepos = topStarredRepos.map((repo: any) => ({
        id: repo.id, // Assure-toi que l'ID est bien récupéré dans la query principale
        name: repo.name,
        description: repo.description,
        url: repo.url,
        stars: repo.stargazers.totalCount,
        forks: repo.forkCount
      }));
  }


  return {
    name: user.name || user.login,
    githubUser: user.login,
    avatarUrl: user.avatarUrl,
    bio: user.bio || 'Développeur passionné',
    location: user.location || 'Quelque part dans le code',
    followers: user.followers.totalCount,
    publicRepos: user.repositories.totalCount,
    totalStars,
    topLanguages,
    highlightedRepos,
    contributionsLastYear: user.contributionsCollection.contributionCalendar.totalContributions,
    // On ne touche pas au template ici, il sera géré par App.tsx
  } as CardData;
}
