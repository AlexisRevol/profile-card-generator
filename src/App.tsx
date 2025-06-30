// src/App.tsx

import { useState, useRef } from 'react';
import type { CardData } from './types';
import Card from './components/Card';
import CardForm from './components/CardForm';
import { CgSpinner } from 'react-icons/cg'; // Une belle icône de chargement
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
  // customSkills: [...] // -> Supprimer cette ligne
  highlightedRepos: [ // Tu peux mettre un exemple
      { id: '1', name: 'mon-super-projet', description: 'Un projet incroyable pour ma carte de visite.', url: '#', stars: 123, forks: 45 },
      { id: '2', name: 'portfolio-v2', description: 'La deuxième version de mon portfolio personnel.', url: '#', stars: 88, forks: 12 },
  ],
  contributionsLastYear: 1337,
  template: 'holographic',
};

function App() {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // const handleDownloadImage = () => { /* ... */ };

 return (
    // Ce conteneur a juste un fond et prend toute la hauteur.
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">

      {/* 
        On utilise Grid pour créer deux colonnes qui s'étirent sur toute la hauteur.
        - `lg:grid-cols-2`: On divise l'écran en 2 colonnes sur PC.
        - `h-screen`: On force la grille à prendre 100% de la hauteur de l'écran.
      */}
      <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* COLONNE DE GAUCHE : LE FORMULAIRE */}
        {/* 
          - On lui donne un padding.
          - `overflow-y-auto`: TRÈS IMPORTANT. Si le formulaire est trop long (sur un petit écran),
            SEULE CETTE COLONNE aura une barre de scroll, pas la page entière.
        */}
        <aside className="p-4 sm:p-8 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Personnalisez votre Carte</h1>
          <CardForm 
              cardData={cardData}
              setCardData={setCardData} 
              setIsLoading={setIsLoading}
              isLoading={isLoading}
          />
        </aside>


       {/* === COLONNE DE DROITE - AMÉLIORÉE POUR LE CHARGEMENT === */}
        <main className="hidden lg:flex justify-center items-center p-8 overflow-hidden">
          {/*
            On transforme ce conteneur en 'relative' pour pouvoir positionner
            l'overlay de chargement par-dessus.
          */}
          <div className="relative w-[512px] max-w-full">
            {/* 
              On ajoute un effet de flou et on baisse l'opacité de la carte
              pendant le chargement pour un effet visuel agréable.
            */}
            <div 
              ref={cardRef} 
              className={`transition-all duration-300 ${isLoading ? 'blur-sm opacity-60' : 'blur-0 opacity-100'}`}
            >
              <Card data={cardData} />
            </div>
            
            {/* === L'OVERLAY DE CHARGEMENT === */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/20 rounded-2xl">
                <CgSpinner className="animate-spin text-5xl mb-4" />
                <p className="font-semibold text-lg">Mise à jour...</p>
              </div>
            )}
          </div>
        </main>
      
        {/* === VUE MOBILE - AMÉLIORÉE AUSSI === */}
        <div className="lg:hidden p-4">
          {/* On applique la même logique ici */}
          <div className="relative w-full max-w-md mx-auto">
            <div 
              ref={cardRef} // Attention: ref est utilisé 2 fois, idéalement il faudrait une autre logique, mais pour l'UI c'est ok
              className={`transition-all duration-300 ${isLoading ? 'blur-sm opacity-60' : 'blur-0 opacity-100'}`}
            >
              <Card data={cardData} />
            </div>
            {isLoading && (
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/20 rounded-2xl">
                <CgSpinner className="animate-spin text-4xl mb-2" />
                <p className="font-semibold">Update...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;