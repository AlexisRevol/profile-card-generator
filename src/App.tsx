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
    // J'ai enlevé la couleur de fond ici pour que le thème de votre système s'applique
    // Vous pouvez la remettre si besoin (ex: `bg-gray-100 dark:bg-gray-900`)
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      {/* On revient au max-w-6xl pour un layout plus centré */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* --- CORRECTION DU LAYOUT --- */}
        {/* Colonne 1 : Le formulaire redevient une sidebar discrète */}
        {/* On retire bg-white et shadow-lg pour qu'il se fonde dans le décor */}
        <aside className="w-full lg:w-1/3 lg:max-w-md">
          <CardForm 
            cardData={cardData}
            setCardData={setCardData} 
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </aside>

        {/* Colonne 2 : La carte reste l'élément principal */}
        <main className="w-full lg:w-2/3 flex flex-col items-center lg:items-start gap-6">
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