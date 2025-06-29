// src/components/CardForm.tsx

import React, { useState } from 'react';
import type { CardData } from '../types';
import { fetchGithubUserData } from '../services/githubService';

interface CardFormProps {
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export default function CardForm({ setCardData, setIsLoading, isLoading }: CardFormProps) {
  const [username, setUsername] = useState('');

  const handleFetchGithub = async () => {
    if (!username) {
      alert('Veuillez entrer un pseudo GitHub.');
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetchGithubUserData(username);
      setCardData(data);
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleFetchGithub(); }}>
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
  );
}