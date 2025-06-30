// src/components/CardForm.tsx

import React, { useState } from 'react';
import type { CardData, SkillCategory  } from '../types';
import { fetchGithubUserData } from '../services/githubService';
import { TEMPLATES } from '../config/templates';
import { FaPlus, FaTrash, FaSearch , FaGithub, FaExclamationCircle } from 'react-icons/fa'; // Icônes pour l'UI

// --- Classes CSS adaptatives pour nos champs ---
// Contient des styles par défaut (light mode) et des styles pour le dark mode (préfixe `dark:`)
const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";
// CORRECTION : On rend le padding et la taille du texte responsifs
const inputClasses = "block w-full rounded-md border-0 py-1.5 sm:py-2 px-2.5 sm:px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-xs sm:text-sm";

interface CardFormProps {
  cardData: CardData;
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export default function CardForm({ cardData, setCardData, setIsLoading, isLoading }: CardFormProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFetchGithub = async () => {
    if (!username) {
      setError('Veuillez entrer un pseudo GitHub.');
      return;
    }
    setIsLoading(true);
    setError(null); // On réinitialise l'erreur au début de chaque requête

    try {
      const fetchedData = await fetchGithubUserData(username);
      setCardData(prevData => ({ 
        ...prevData,
        ...fetchedData,
        template: prevData.template
      }));
    } catch (err) {
      // On affiche le message d'erreur de manière contrôlée
      const errorMessage = (err as Error).message;
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    // On efface l'erreur dès que l'utilisateur tape
    if (error) {
      setError(null);
    }
  }


return (
    <div className="space-y-6">
      
      {/* === SECTION 1: RECHERCHE GITHUB - AMÉLIORÉE === */}
      <form onSubmit={(e) => { e.preventDefault(); handleFetchGithub(); }}>
        <label htmlFor="githubUser" className={labelClasses}>
          Pseudo GitHub
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="githubUser"
            // On ajoute une bordure rouge si une erreur est présente
            className={`${inputClasses} rounded-r-none ${error ? 'ring-red-500 dark:ring-red-500 focus:ring-red-500' : ''}`}
            placeholder="octocat"
            value={username}
            onChange={handleUsernameChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              // Petite animation de points pendant le chargement
              <span className="animate-pulse">...</span>
            ) : (
              <FaSearch className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
        
        {/* === NOUVEL ÉLÉMENT : AFFICHAGE DE L'ERREUR === */}
        {error && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400" role="alert">
            <FaExclamationCircle className="flex-shrink-0"/>
            <p>{error}</p>
          </div>
        )}
      </form>

      {/* === NOUVEL ORDRE - SECTION 2: CHOIX DU MODÈLE === */}
      <div>
        <label className={labelClasses}>
          Choix du modèle
        </label>
        <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              className={`text-xs py-2 rounded-md transition-all 
                py-1.5 px-3 text-xs 
                sm:py-2 sm:px-4 sm:text-sm
                ${
                cardData.template === template.id
                  ? 'bg-indigo-600 text-white font-semibold ring-2 ring-offset-2 ring-indigo-500 ring-offset-gray-100 dark:ring-offset-gray-900'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
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