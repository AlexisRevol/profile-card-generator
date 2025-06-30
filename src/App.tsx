// src/App.tsx

import { useState, useRef } from 'react';
import type { CardData } from './types';
import Card from './components/Card';
import CardForm from './components/CardForm';
import CardSkeleton from './components/CardSkeleton'; // Importation du skeleton loader
import './App.css';

// Il est préférable de définir les données initiales dans un objet séparé
// pour garder le composant App plus propre.
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

  // SOLUTION POUR LA REF : On crée une ref pour chaque vue (desktop et mobile)
  // pour éviter les conflits et les anti-patterns React.
  const cardRefDesktop = useRef<HTMLDivElement>(null);
  const cardRefMobile = useRef<HTMLDivElement>(null);

  // Exemple de fonction de téléchargement qui choisit la bonne ref
  const handleDownloadImage = () => {
     const targetRef = cardRefDesktop.current ? cardRefDesktop : cardRefMobile;
     if (!targetRef.current) {
       console.error("Aucune référence de carte à télécharger.");
       return;
     }
     // ... logique de conversion en image avec html-to-image ...
  };

  return (
    // Conteneur principal qui définit le fond et la hauteur minimale
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">

      {/* 
        Grille principale qui divise l'écran en deux colonnes sur les grands écrans.
        Prend toute la hauteur de l'écran.
      */}
      <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* COLONNE DE GAUCHE : LE FORMULAIRE */}
        <aside className="p-4 sm:p-8 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Personnalisez votre Carte
          </h1>
          <CardForm 
              cardData={cardData}
              setCardData={setCardData} 
              setIsLoading={setIsLoading}
              isLoading={isLoading}
          />
          {/* Tu pourrais ajouter le bouton de téléchargement ici */}
          {/* <button onClick={handleDownloadImage} className="...">Télécharger</button> */}
        </aside>

        {/* COLONNE DE DROITE : APERÇU DE LA CARTE (visible sur grand écran) */}
        <main className="hidden lg:flex justify-center items-center p-8 overflow-hidden">
          {/* Conteneur qui fixe la taille de l'aperçu sur PC */}
          <div className="w-[512px] max-w-full">
            {/* 
              RENDU CONDITIONNEL :
              Si isLoading est true, on affiche le skeleton loader.
              Sinon, on affiche la vraie carte.
            */}
            {isLoading ? (
               <CardSkeleton templateId={cardData.template} />
            ) : (
              // On attache la ref spécifique au desktop ici
              <div ref={cardRefDesktop}>
                <Card data={cardData} />
              </div>
            )}
          </div>
        </main>
      
        {/* APERÇU DE LA CARTE SUR MOBILE (visible sur petit écran) */}
        <div className="lg:hidden p-4">
          {/* Conteneur qui gère la taille sur mobile */}
          <div className="w-full max-w-md mx-auto">
            {/* On applique la même logique de rendu conditionnel ici */}
            {isLoading ? (
               <CardSkeleton templateId={cardData.template} />
            ) : (
              // On attache la ref spécifique au mobile ici
              <div ref={cardRefMobile}>
                <Card data={cardData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;