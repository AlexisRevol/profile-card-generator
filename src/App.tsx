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
  bio: 'Pseudo',
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
    // --- CORRECTION ICI : On donne plus d'espace à l'ensemble sur PC ---
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      {/* On revient à une largeur max plus raisonnable pour l'ensemble */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Le reste du fichier App.tsx ne change pas par rapport à la version précédente */}
        <aside className="w-full lg:w-full lg:min-w-[384px] lg:max-w-md">
          <CardForm 
            cardData={cardData}
            setCardData={setCardData} 
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </aside>

        {/* La colonne de la carte va maintenant pouvoir s'agrandir beaucoup plus */}
        <main className="w-full flex flex-col items-center lg:items-start gap-6">
          <div ref={cardRef} className="w-full flex justify-center lg:justify-start">
            <Card data={cardData} />
          </div>

          <button 
            className="w-full max-w-xs bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Télécharger la Carte
          </button>
        </main>
      </div>
    </div>
  );
}


export default App;