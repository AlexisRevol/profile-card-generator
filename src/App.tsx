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
  template: 'pokemon',
};

function App() {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [isLoading, setIsLoading] = useState(false); // État pour le chargement
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = () => { /* ... (pas de changement ici) ... */ };

  return (
    <div className="app-container">
      <main className="main-content">
        <div ref={cardRef}>
          <Card data={cardData} />
        </div>
      </main>
      <aside className="sidebar">
        <CardForm 
          setCardData={setCardData} 
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
        <button className="download-button" onClick={handleDownloadImage}>
          Télécharger la Carte
        </button>
      </aside>
    </div>
  );
}

export default App;