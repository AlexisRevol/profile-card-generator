// src/components/CardForm.tsx

import React from 'react';
import type { CardData } from '../types';

// On définit les props que le composant attend
interface CardFormProps {
  cardData: CardData;
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
}

// Un type pour la réponse de l'API GitHub (uniquement les champs qui nous intéressent)
interface GitHubUser {
  name: string;
  avatar_url: string;
  bio: string | null;
}

export default function CardForm({ cardData, setCardData }: CardFormProps) {
  
  // Gère les changements dans n'importe quel input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // Gère la récupération des données depuis GitHub
  const handleFetchGithub = async () => {
    if (!cardData.githubUser) {
      alert('Veuillez entrer un pseudo GitHub.');
      return;
    }
    try {
      const response = await fetch(`https://api.github.com/users/${cardData.githubUser}`);
      if (!response.ok) {
        throw new Error('Utilisateur GitHub non trouvé.');
      }
      const data: GitHubUser = await response.json();
      
      // Met à jour l'état avec les données récupérées
      setCardData(prevData => ({
        ...prevData,
        name: data.name || prevData.githubUser,
        avatarUrl: data.avatar_url,
        skills: data.bio || prevData.skills, // On peut utiliser la bio comme base pour les skills
      }));
      
    } catch (error) {
      console.error(error);
      alert('Impossible de récupérer les informations de l\'utilisateur.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="githubUser" className="block text-sm font-medium text-gray-700">Pseudo GitHub</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="githubUser"
            id="githubUser"
            className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="octocat"
            value={cardData.githubUser}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleFetchGithub}
            className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 hover:bg-gray-100"
          >
            Chercher
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
        <input
          type="text"
          name="name"
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={cardData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Compétences / Titre</label>
        <input
          type="text"
          name="skills"
          id="skills"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={cardData.skills}
          onChange={handleChange}
        />
      </div>

      {/* Pour les technologies, un simple input pour commencer */}
      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">Technologies (séparées par une virgule)</label>
        <input
          type="text"
          name="technologies"
          id="technologies"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={cardData.technologies.join(',')}
          onChange={(e) => setCardData(prev => ({...prev, technologies: e.target.value.split(',').map(t => t.trim())}))}
        />
      </div>
    </form>
  );
}