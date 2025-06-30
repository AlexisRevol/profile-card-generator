// src/components/CardSkeleton.tsx

// On utilise les mêmes dépendances que la carte pour avoir la même structure de base
import { TEMPLATES } from '@/config/templates';
import { SiGithub } from 'react-icons/si';

// Une fonction pour générer des barres de squelette, pour éviter la répétition
const SkeletonBar = ({ className }: { className: string }) => (
  <div className={`bg-gray-300/50 dark:bg-gray-700/50 rounded-md animate-pulse ${className}`} />
);

// 1. Définir les props que le composant va accepter
interface CardSkeletonProps {
  templateId: string; // On attend l'ID du template à utiliser
}


export default function CardSkeleton({ templateId }: CardSkeletonProps) {
  // On prend un template par défaut pour le fond, par exemple 'holographic' ou 'dark'
  const currentTemplate = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];

  return (
    // On garde EXACTEMENT le même conteneur principal que Card.tsx
    <div
      className={`
          w-full max-w-[300px]  // 🔥 Ajoute cette limite
          mx-auto
          aspect-[384/536] 
        rounded-2xl shadow-lg font-sans ${currentTemplate.outerClassName}
      `}
    >
      <div className={`relative w-full h-full rounded-xl overflow-hidden ${currentTemplate.innerClassName}`}>
        
        {/* --- HEADER SKELETON --- */}
        <header className="absolute top-3 left-3 @[22rem]:top-6 @[22rem]:left-6 flex items-center gap-1.5 @[22rem]:gap-2.5 z-10">
          <SiGithub className="text-lg @[22rem]:text-2xl text-gray-400 dark:text-gray-600" />
          <SkeletonBar className="w-28 h-5 @[22rem]:h-6" />
        </header>

        {/* --- AVATAR SKELETON --- */}
        <div 
          className="absolute top-12 -right-4 w-36 h-36 @[22rem]:top-20 @[22rem]:-right-8 @[22rem]:w-64 @[22rem]:h-64"
          style={{ maskImage: 'linear-gradient(to bottom left, black 40%, transparent 80%)' }}
        >
          <div className="w-full h-full rounded-full bg-gray-300/50 dark:bg-gray-700/50 animate-pulse" />
        </div>

        {/* --- CORPS PRINCIPAL SKELETON --- */}
        <div className="absolute top-[160px] left-4 w-[70%] @[22rem]:top-64 @[22rem]:left-6 @[22rem]:w-[65%] flex flex-col gap-3 @[22rem]:gap-4 z-10 text-left">
          <SkeletonBar className="w-1/2 h-4 @[22rem]:h-6" />
          
          <div className="space-y-3 @[22rem]:space-y-4">
            {/* On simule 3 dépôts */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-2 @[22rem]:gap-3">
                <SkeletonBar className="w-4 h-4 @[22rem]:w-5 @[22rem]:h-5 mt-1 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <SkeletonBar className="w-3/4 h-3 @[22rem]:h-4" />
                  <SkeletonBar className="w-full h-2 @[22rem]:h-3" />
                  <SkeletonBar className="w-1/2 h-2 @[22rem]:h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- TECHNOLOGIES FAVORITES SKELETON --- */}
        <div className="absolute bottom-3 left-3 @[22rem]:bottom-6 @[22rem]:left-6 z-10">
          <SkeletonBar className="w-32 h-3 mb-2" />
          <div className="flex items-center gap-1.5 @[22rem]:gap-3">
            {[...Array(5)].map((_, i) => (
              <SkeletonBar key={i} className="w-6 h-6 @[22rem]:w-8 @[22rem]:h-8 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}