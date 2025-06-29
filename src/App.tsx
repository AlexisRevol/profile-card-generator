// src/App.tsx

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import type { CardData } from './types'; // Importe notre type

import Card from './components/Card';
import CardForm from './components/CardForm';
import './App.css'; // Un peu de CSS pour la mise en page

// L'état initial de notre carte, conforme à l'interface CardData
const initialCardData: CardData = {
  name: 'Ton Nom',
  githubUser: '',
  avatarUrl: 'https://github.com/github.png', // Une image par défaut
  skills: 'Développeur Front-End | Designer UI/UX',
  technologies: ['react', 'typescript', 'vite', 'tailwind'],
  template: 'pokemon',
};

function App() {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const cardRef = useRef<HTMLDivElement>(null); // Référence pour la capture d'écran

  const handleDownloadImage = () => {
    if (cardRef.current === null) {
      return;
    }
    toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 }) // pixelRatio pour une meilleure qualité
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${cardData.githubUser || 'ma'}-carte-github.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Erreur lors de la génération de l\'image', err);
      });
  };

  return (
    <div className="app-container">
      <main className="main-content">
        {/* La carte est enveloppée dans la div qui sera capturée */}
        <div ref={cardRef}>
          <Card data={cardData} />
        </div>
      </main>
      <aside className="sidebar">
        <CardForm cardData={cardData} setCardData={setCardData} />
        <button className="download-button" onClick={handleDownloadImage}>
          Télécharger la Carte
        </button>
      </aside>
    </div>
  );
}

export default App;