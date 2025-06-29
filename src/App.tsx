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
        {/*
          - C'est un conteneur Flexbox.
          - `justify-center` et `items-center`: Il va centrer parfaitement son contenu (la carte).
          - `p-8`: Il donne de l'air autour de la carte.
          - `overflow-hidden`: Empêche tout dépassement accidentel.
        */}
        <main className="hidden lg:flex justify-center items-center p-8 overflow-hidden">
          
          {/* 
            === LE CONTRÔLE FINAL DE LA TAILLE ===
            C'est ce div qui détermine la taille EXACTE de la carte.
            - `w-[384px]`: On fixe sa largeur à 384px (la largeur de base de votre aspect-ratio).
            - Vous pouvez ajuster cette valeur, par exemple `w-[420px]` ou `w-[500px]`.
            - `max-w-full`: S'assure qu'elle ne dépasse pas la colonne sur des écrans plus petits.
            Votre composant Card à l'intérieur s'adaptera parfaitement à cette largeur.
          */}
          <div ref={cardRef} className="w-[384px] max-w-full">
            <Card data={cardData} />
          </div>

        </main>
        
        {/* LA CARTE SUR MOBILE : Elle doit être visible aussi sur mobile ! */}
        {/* On la met dans la colonne du formulaire pour les petits écrans. */}
        <div className="lg:hidden p-4">
           <div ref={cardRef} className="w-full max-w-md mx-auto">
               <Card data={cardData} />
           </div>
        </div>


      </div>
    </div>
  );
}

export default App;