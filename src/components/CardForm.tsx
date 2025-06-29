// src/components/CardForm.tsx

import React, { useState } from 'react';
import type { CardData } from '../types';
import { fetchGithubUserData } from '../services/githubService';
import { TEMPLATES } from '../config/templates';

interface CardFormProps {
  cardData: CardData; 
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}
export default function CardForm({ cardData, setCardData, setIsLoading, isLoading }: CardFormProps) {
  const [username, setUsername] = useState('');

  const handleFetchGithub = async () => {
    if (!username) {
      alert('Veuillez entrer un pseudo GitHub.');
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetchGithubUserData(username);
    setCardData(prevData => ({ ...data, template: prevData.template }));
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6"> {/* Ajout d'un conteneur principal */}
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleFetchGithub(); }}>
         {/* ... (le formulaire de recherche GitHub ne change pas) ... */}
        <div>
            <label htmlFor="githubUser" className="block text-sm font-medium text-gray-700">
            Pseudo GitHub
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
            <input
                type="text"
                id="githubUser"
                className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="octocat"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
            />
            <button
                type="submit"
                className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 hover:bg-gray-100 disabled:bg-gray-200"
                disabled={isLoading}
            >
                {isLoading ? 'Chargement...' : 'Chercher'}
            </button>
            </div>
        </div>
        {/* On peut enlever les autres champs, car tout est auto-généré maintenant ! */}
        </form>

         {/* --- NOUVEAU: Sélecteur de Modèle --- */}
         <div>
        <label className="block text-sm font-medium text-gray-700">
          Choix du modèle
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              className={`text-sm py-2 rounded-md transition-all ${
                cardData.template === template.id
                  ? 'bg-indigo-600 text-white font-semibold ring-2 ring-offset-2 ring-indigo-500'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setCardData(prevData => ({ ...prevData, template: template.id }))}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}