import type { CardData, HighlightedRepo } from '@/types';

const GITHUB_API_URL = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const GITHUB_OWNER_QUERY_OPTIMIZED = `
  query GetOwner($username: String!) {
    repositoryOwner(login: $username) {
      __typename
      ... on User {
        name
        login
        avatarUrl
        bio
        location
        followers {
          totalCount
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
      ... on Organization {
        name
        login
        avatarUrl
        description
        location
        membersWithRole {
            totalCount
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
      # === OPTIMISATION MAJEURE ICI ===
      # On ne demande que les 10 dépôts les plus étoilés au lieu de 100.
      # C'est souvent suffisant pour calculer les top langages et les étoiles.
      repositories(first: 10, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          id
          name
          description
          url
          stargazerCount
          forkCount
          # On ne demande les langages que pour ces 10 dépôts.
          languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
            nodes {
              name
            }
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
      query: GITHUB_OWNER_QUERY_OPTIMIZED,
      variables: { username },
    }),
  });

  const { data, errors } = await response.json();

  if (errors || !data?.repositoryOwner) {
    console.error('Erreurs GraphQL ou propriétaire non trouvé:', errors || 'Propriétaire non trouvé');
    throw new Error(`Impossible de trouver l'utilisateur ou l'organisation '${username}'.`);
  }

  const owner = data.repositoryOwner;

  let totalStars = 0;
  const langMap = new Map<string, number>();
  owner.repositories.nodes.forEach((repo: any) => {
    totalStars += repo.stargazerCount.totalCount; 
    repo.languages.nodes.forEach((lang: any) => {
      langMap.set(lang.name, (langMap.get(lang.name) || 0) + 1);
    });
  });
  const topLanguages = Array.from(langMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0]);

  let highlightedRepos: HighlightedRepo[] = owner.pinnedItems.nodes.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.url,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
  }));

  if (highlightedRepos.length === 0) {
    const topStarredRepos = owner.repositories.nodes.slice(0, 3);
    highlightedRepos = topStarredRepos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stars: repo.stargazerCount.totalCount, 
      forks: repo.forkCount,
    }));
  }

  const isUser = owner.__typename === 'User';

  return {
    name: owner.name || owner.login,
    githubUser: owner.login,
    avatarUrl: owner.avatarUrl,
    bio: (isUser ? owner.bio : owner.description) || 'GitHub Profile',
    location: owner.location || 'Sur GitHub',
    followers: isUser ? owner.followers.totalCount : owner.membersWithRole.totalCount,
    publicRepos: owner.repositories.totalCount,
    totalStars,
    topLanguages,
    highlightedRepos,
    contributionsLastYear: isUser ? owner.contributionsCollection.contributionCalendar.totalContributions : 0,
  } as CardData;
}