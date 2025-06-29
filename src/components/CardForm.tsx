// src/components/CardForm.tsx

import React, { useState } from 'react';
import type { CardData, SkillCategory  } from '../types';
import { fetchGithubUserData } from '../services/githubService';
import { TEMPLATES } from '../config/templates';
import { FaPlus, FaTrash, FaSearch , FaGithub} from 'react-icons/fa'; // Icônes pour l'UI

// --- Classes CSS adaptatives pour nos champs ---
// Contient des styles par défaut (light mode) et des styles pour le dark mode (préfixe `dark:`)
const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";
const inputClasses = "block w-full rounded-md border-0 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm";

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

   // --- Fonctions de gestion des compétences ---
  const handleSkillChange = (index: number, field: keyof SkillCategory, value: string) => {
    const newSkills = [...cardData.customSkills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setCardData(prev => ({ ...prev, customSkills: newSkills }));
  };

  const addSkillCategory = () => {
    const newSkills: SkillCategory[] = [
      ...cardData.customSkills,
      { id: Date.now().toString(), category: 'Nouvelle Catégorie', skills: 'Compétence 1, Compétence 2' }
    ];
    setCardData(prev => ({ ...prev, customSkills: newSkills }));
  };

  const removeSkillCategory = (index: number) => {
    const newSkills = cardData.customSkills.filter((_, i) => i !== index);
    setCardData(prev => ({ ...prev, customSkills: newSkills }));
  };


return (
    // On augmente l'espace global pour une meilleure séparation visuelle
    <div className="space-y-6">
      
      {/* === SECTION 1: RECHERCHE GITHUB (inchangée) === */}
      <form onSubmit={(e) => { e.preventDefault(); handleFetchGithub(); }}>
        <label htmlFor="githubUser" className={labelClasses}>
          Pseudo GitHub
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="githubUser"
            className={`${inputClasses} rounded-r-none`}
            placeholder="octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? '...' : <FaSearch className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          </button>
        </div>
      </form>

      {/* === NOUVEL ORDRE - SECTION 2: CHOIX DU MODÈLE === */}
      <div>
        <label className={labelClasses}>
          Choix du modèle
        </label>
        <div className="mt-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              className={`text-xs py-2 rounded-md transition-all ${
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
      
      {/* === NOUVEL ORDRE - SECTION 3: COMPÉTENCES (COMPACT & CLAIR) === */}
      <div>
        <label className={labelClasses}>
          Domaines de Compétences
        </label>
        <div className="mt-1 space-y-2">
          {cardData.customSkills.map((skill, index) => (
            <div key={skill.id} className="group flex items-center gap-2">
              {/* Le champ Catégorie prend moins de place */}
              <input
                type="text"
                placeholder="Catégorie"
                className={`${inputClasses} w-1/3 flex-shrink-0`}
                value={skill.category}
                onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
              />
              {/* Le champ Compétences prend le reste de la place */}
              <input
                type="text"
                placeholder="Compétences (ex: React, Node.js)"
                className={`${inputClasses} flex-grow`}
                value={skill.skills}
                onChange={(e) => handleSkillChange(index, 'skills', e.target.value)}
              />
              {/* Bouton supprimer, visible au survol et corrigé pour le dark mode */}
              <button
                onClick={() => removeSkillCategory(index)}
                className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 transition-all"
                aria-label="Supprimer la catégorie"
              >
                <FaTrash className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
           {/* Bouton "Ajouter" minimaliste */}
           <button
            onClick={addSkillCategory}
            className="w-full flex items-center justify-center text-sm py-1.5 border-2 border-dashed rounded-md text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-500 transition"
           >
            <FaPlus />
           </button>
        </div>
      </div>

    </div>
  );
}