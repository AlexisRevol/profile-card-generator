// src/App.tsx

import { useState, useRef } from 'react';
import type { CardData } from './types';
import Card from './components/Card';
import CardForm from './components/CardForm';
import CardSkeleton from './components/CardSkeleton';
import './App.css';

const initialCardData: CardData = {
  name: 'Ton Nom',
  githubUser: 'github',
  avatarUrl: 'https://github.com/github.png',
  bio: 'Développeur ou Organisation',
  location: 'Planète Terre',
  followers: 12345,
  publicRepos: 100,
  totalStars: 54321,
  topLanguages: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Python'],
  highlightedRepos: [
    { id: '1', name: 'mon-super-projet', description: 'Un projet incroyable pour ma carte de visite.', url: '#', stars: 123, forks: 45 },
    { id: '2', name: 'portfolio-v2', description: 'La deuxième version de mon portfolio personnel.', url: '#', stars: 88, forks: 12 },
    { id: '3', name: 'outil-revolutionnaire', description: 'Un outil qui va changer le monde du dev.', url: '#', stars: 55, forks: 9 },
  ],
  contributionsLastYear: 1337,
  template: 'holographic',
};

function App() {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [isLoading, setIsLoading] = useState(false);
  
  // On n'a plus besoin de deux refs, une seule suffit car il n'y a plus qu'une seule vue.
  const cardRef = useRef<HTMLDivElement>(null);

  // const handleDownloadImage = () => { ... };

  return (
    // ÉTAPE 1 : Conteneur principal de la page
    // - `min-h-screen`: Prend au moins toute la hauteur de l'écran.
    // - `flex items-center`: Centre verticalement le contenu s'il est plus petit que l'écran.
    // - `justify-center`: Centre horizontalement.
    // - `p-4 sm:p-8`: Ajoute de l'espace sur les bords.
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 sm:p-8">
      
      {/* ÉTAPE 2 : Conteneur du contenu avec une largeur maximale */}
      {/* - `w-full`: Prend toute la largeur disponible.
          - `max-w-xl`: Limite la largeur à `xl` (environ 768px) sur les grands écrans.
            Tu peux changer cette valeur (ex: max-w-lg, max-w-2xl).
          - `space-y-8`: Ajoute un espace vertical entre le formulaire et la carte.
      */}
      <div className="w-full max-w-xl space-y-8">
        
        {/* ÉLÉMENT 1 : Le formulaire */}
        <section>
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Personnalisez votre Carte
          </h1>
          <CardForm 
              cardData={cardData}
              setCardData={setCardData} 
              setIsLoading={setIsLoading}
              isLoading={isLoading}
          />
        </section>

        {/* ÉLÉMENT 2 : L'aperçu de la carte */}
        <section>
          {/* 
            RENDU CONDITIONNEL :
            La logique reste la même, on affiche le squelette ou la carte.
          */}
          {isLoading ? (
            <CardSkeleton templateId={cardData.template} />
          ) : (
            // On attache la seule et unique ref ici.
            <div ref={cardRef}>
              <Card data={cardData} />
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default App;