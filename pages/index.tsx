// src/App.tsx

import { useState, useRef } from 'react';
import type { CardData } from '@/types';
import Card from '@/components/Card';
import CardForm from '@/components/CardForm';
import CardSkeleton from '@/components/CardSkeleton';
import '@/global.css';
import html2canvas from 'html2canvas'; 

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

   const handleDownloadImage = () => {
    if (!cardRef.current) return;

    // Pour un meilleur rendu, on retire temporairement la transformation `scale`
    // car html2canvas peut mal l'interpréter.
    const cardContainer = cardRef.current.parentElement;
    const originalTransform = cardContainer ? cardContainer.style.transform : '';
    if (cardContainer) {
      cardContainer.style.transform = 'scale(1)';
    }

    html2canvas(cardRef.current, {
      useCORS: true,
      backgroundColor: null,
      scale: 3,
    }).then((canvas) => {
      // On remet la transformation `scale` en place après la capture
      if (cardContainer) {
        cardContainer.style.transform = originalTransform;
      }
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `carte-github-${cardData.githubUser || 'utilisateur'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 sm:p-8 overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* COLONNE 1 : Le formulaire */}
        <section>
          <div className="relative"> {/* Ajout d'un conteneur `relative` pour l'icône flottante */}
            <h1 className="text-1xl lg:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center lg:text-left">
              Personnalisez votre Carte
            </h1>
            <CardForm 
                cardData={cardData}
                setCardData={setCardData} 
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                // On passe la fonction de téléchargement en prop
                onDownload={handleDownloadImage}
            />
          </div>
        </section>

        {/* COLONNE 2 : L'aperçu de la carte */}
        <section>
            <div className="w-full transition-transform duration-300 ease-in-out origin-top scale-90 lg:scale-100">
              <div ref={cardRef}>
                {isLoading ? (
                  <CardSkeleton templateId={cardData.template} />
                ) : (
                  <Card data={cardData} />
                )}
              </div>
            </div>
        </section>

      </div>
    </div>
  );
}

export default App;