// src/App.tsx

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import type { CardData } from './types';

import Card from './components/Card';
import CardForm from './components/CardForm';
import './App.css'; 

const initialCardData: CardData = {
  name: 'Ton Nom',
  githubUser: '',
  avatarUrl: 'https://github.com/github.png',
  bio: 'Entre un pseudo GitHub et clique sur "Chercher" !',
  location: 'Planète Terre',
  followers: 0,
  publicRepos: 0,
  totalStars: 0,
  topLanguages: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Python'],
  customSkills: [
    { id: '1', category: 'Développement Web', skills: 'React, TypeScript, Node.js' },
    { id: '2', category: 'Outils & Design', skills: 'Figma, Git, Tailwind CSS' },
  ],
  template: 'holographic',
};

function App() {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [isLoading, setIsLoading] = useState(false); // État pour le chargement
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = () => { /* ... (pas de changement ici) ... */ };

 return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12">


        {/* Colonne 1 : Le formulaire (la sidebar sur desktop) */}
        <aside className="w-full lg:w-1/3 lg:max-w-md bg-white p-6 rounded-xl shadow-lg">
          <CardForm 
            cardData={cardData}
            setCardData={setCardData} 
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </aside>

        {/* Colonne 2 : La carte et le bouton de téléchargement */}
        <main className="w-full lg:w-2/3 flex flex-col items-center lg:items-start gap-6">
          
          {/* --- CORRECTION APPLIQUÉE ICI --- */}
          {/* On donne une largeur au conteneur pour que le "w-full" de la carte ait un sens */}
          <div ref={cardRef} className="w-full flex justify-center lg:justify-start">
            <Card data={cardData} />
          </div>

          <button 
            className="w-full max-w-xs bg-indigo-600 ..."
            onClick={handleDownloadImage}
          >
            Télécharger la Carte
          </button>
        </main>

      </div>
    </div>
  );
}



export default App;