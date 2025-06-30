// src/components/CardForm.tsx

import React, { useState } from 'react';
import type { CardData } from '../types';
import { TEMPLATES } from '../config/templates';
import { FaSearch, FaExclamationCircle, FaDownload } from 'react-icons/fa';

const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";
// On ajuste un peu le padding pour que ça respire mieux avec 3 éléments
const inputClasses = "block w-full rounded-md border-0 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm";

interface CardFormProps {
  cardData: CardData;
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  onDownload: () => void;
}

export default function CardForm({ cardData, setCardData, isLoading, onDownload }: CardFormProps) {
  const [username] = useState('');
  const [error] = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState('');
  
  const handleFetchGithub = async () => { /* ... */ };
  const handleUsernameChange = () => { /* ... */ };

   const handleGenerateUrl = () => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/api/card?user=${cardData.githubUser}&template=${cardData.template}`;
    const markdown = `![GitHub Card](${url})`;
    setGeneratedUrl(markdown);
  };

  return (
    <div className="space-y-6">
      
      {/* === SECTION 1: RECHERCHE GITHUB - MODIFIÉE === */}
      <form onSubmit={(e) => { e.preventDefault(); handleFetchGithub(); }}>
        <label htmlFor="githubUser" className={labelClasses}>
          Pseudo GitHub
        </label>
        {/* 
          Le conteneur principal des actions.
          - `flex items-center gap-2` : aligne tout horizontalement.
        */}
        <div className="mt-1 flex items-center gap-2">
          
          {/* L'input prendra tout l'espace restant */}
          <input
            type="text"
            id="githubUser"
            className={`${inputClasses} ${error ? 'ring-red-500 dark:ring-red-500 focus:ring-red-500' : ''}`}
            placeholder="octocat"
            value={username}
            onChange={handleUsernameChange}
            disabled={isLoading}
          />

          {/* Bouton de recherche */}
          <button
            type="submit"
            className="flex-shrink-0 inline-flex items-center justify-center p-2 rounded-md ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            disabled={isLoading}
            aria-label="Rechercher"
          >
            {isLoading ? (
              <span className="animate-pulse h-5 w-5">...</span>
            ) : (
              <FaSearch className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
          
          {/* Le nouveau bouton de génération */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleGenerateUrl}
              // ... classes du bouton
            >
              Générer le lien Markdown
            </button>
          </div>
 
          {/* Le champ pour afficher le résultat */}
          {generatedUrl && (
            <div className="mt-4">
              <label htmlFor="markdown-output" className={labelClasses}>
                Copiez ce lien dans votre README GitHub :
              </label>
              <textarea
                id="markdown-output"
                readOnly
                value={generatedUrl}
                className={`${inputClasses} mt-1 h-24 font-mono text-xs`}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>
          )}

        </div>
        
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
      
      {/* 
        BOUTON DE TÉLÉCHARGEMENT - VERSION DESKTOP
        - `hidden lg:block`: Caché sur mobile, visible sur desktop.
      */}
      <div className="hidden lg:block pt-4">
        <button
          type="button"
          onClick={onDownload}
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
        >
          <FaDownload />
          <span>Télécharger la carte</span>
        </button>
      </div>

    </div>
  );
}