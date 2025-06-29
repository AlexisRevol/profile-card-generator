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


        {/* COLONNE DE DROITE : LA CARTE */}
        <main className="hidden lg:flex justify-center items-center p-8 overflow-hidden">
        {/* 
          === LA MODIFICATION CLÉ POUR LE PC ===
          On augmente la largeur de l'aperçu pour un meilleur confort visuel.
          On passe de w-[384px] à w-[512px] (ou la taille que tu préfères).
          Le `max-w-full` garantit qu'il ne débordera jamais de sa colonne.
        */}
        <div ref={cardRef} className="w-[512px] max-w-full">
          <Card data={cardData} />
        </div>

      </main>

      {/* LA CARTE SUR MOBILE : On garde le même comportement flexible */}
      <div className="lg:hidden p-4">
        {/* Ce `ref` est dupliqué, on peut le gérer différemment mais pour l'instant c'est ok */}
        <div className="w-full max-w-md mx-auto">
            <Card data={cardData} />
        </div>
      </div>


      </div>
    </div>
  );
}

export default App;