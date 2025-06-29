// src/components/Card.tsx

import type { CardData } from '../types'; // On importe le type depuis le fichier central
import { FaReact, FaNodeJs, FaFigma, FaGitAlt } from 'react-icons/fa'; // Exemple avec react-icons
import { SiTypescript, SiVite, SiTailwindcss } from 'react-icons/si';

// Pour installer les icônes: npm install react-icons

// On définit les props que le composant attend
interface CardProps {
  data: CardData;
}

// Un dictionnaire pour mapper les noms de techno à des composants d'icône
const iconMap: { [key: string]: React.ComponentType<any> } = {
  react: FaReact,
  typescript: SiTypescript,
  node: FaNodeJs,
  figma: FaFigma,
  vite: SiVite,
  tailwind: SiTailwindcss,
  git: FaGitAlt,
};

// Utilise les classes Tailwind pour le style, c'est plus propre !
export default function Card({ data }: CardProps) {
  return (
    <div className="w-[384px] h-[536px] p-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl shadow-lg">
      <div className="w-full h-full bg-slate-50 rounded-xl p-4 flex flex-col items-center">
        <div className="w-full h-40 bg-gray-200 rounded-lg flex justify-center items-center overflow-hidden">
          {/* Tu pourrais mettre une image de fond ici */}
          <img
            src={data.avatarUrl}
            alt={`Avatar de ${data.name}`}
            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-gray-800 tracking-wide">
          {data.name}
        </h2>
        <p className="mt-1 text-sm text-indigo-500 font-semibold">
          {data.skills}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {data.technologies.map((tech) => {
            const IconComponent = iconMap[tech.toLowerCase()];
            return IconComponent ? <IconComponent key={tech} className="text-4xl text-gray-600" title={tech} /> : null;
          })}
        </div>

        <div className="mt-auto text-xs text-gray-400">
          Généré avec le Card Generator
        </div>
      </div>
    </div>
  );
}