// src/App.tsx

import { useState, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // const handleDownloadImage = () => { /* ... */ };

  return (
    // CORRECTION 1: On enlève le flexbox de centrage. 
    // On met juste un fond et on s'assure qu'il prend tout l'écran.
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* CORRECTION 2: On crée un conteneur principal pour le contenu.
          - `max-w-screen-xl`: Limite la largeur sur les très grands écrans pour que ça ne soit pas démesuré.
          - `mx-auto`: Centre ce conteneur horizontalement.
          - `p-4 sm:p-8`: Garde des marges intérieures confortables.
      */}
      <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-8">

        {/* CORRECTION 3: Le layout principal passe en CSS Grid sur grand écran.
            - `grid grid-cols-1 lg:grid-cols-5`: Sur mobile, une seule colonne. Sur grand écran (lg), une grille de 5 colonnes.
            - `gap-8 lg:gap-12`: Gère l'espacement entre le formulaire et la carte.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Colonne 1: Formulaire */}
          {/* CORRECTION 4: Le formulaire prend 2 colonnes sur 5.
              - `lg:col-span-2`: Le formulaire occupe 2 des 5 colonnes de la grille.
          */}
          <aside className="lg:col-span-2">
            <CardForm 
              cardData={cardData}
              setCardData={setCardData} 
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          </aside>

          {/* Colonne 2: Carte */}
          {/* CORRECTION 5: La carte prend les 3 colonnes restantes.
              - `lg:col-span-3`: La carte a plus d'espace (3/5 de la largeur), elle sera donc naturellement plus grande.
              - `flex flex-col gap-6`: On garde flexbox ici pour organiser la carte et son bouton.
          */}
          <main className="lg:col-span-3 flex flex-col gap-6">
            
            {/* 
              Ce conteneur est important. Il permet de centrer la carte sur mobile 
              et de la positionner au début sur PC, tout en la laissant s'agrandir.
            */}
            <div ref={cardRef} className="w-full">
              <Card data={cardData} />
            </div>

            <button 
              className="w-full max-w-xs mx-auto lg:mx-0 bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
            >
              Télécharger la Carte
            </button>
          </main>

        </div>
      </div>
    </div>
  );
}

export default App;