// src/components/Card.tsx

import type { CardData } from '../types';
import { TEMPLATES } from '../config/templates'; // On importe nos modèles
import { FaReact, FaNodeJs, FaFigma, FaGitAlt, FaPython, FaJava, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiTypescript, SiVite, SiTailwindcss, SiCplusplus, SiSharp, SiGo } from 'react-icons/si';
import { GoRepo, GoStar, GoPerson, GoLocation } from 'react-icons/go';

// Enrichissons notre dictionnaire d'icônes
const iconMap: { [key: string]: React.ComponentType<any> } = {
  react: FaReact, typescript: SiTypescript, javascript: FaJs,
  node: FaNodeJs, figma: FaFigma, vite: SiVite, tailwind: SiTailwindcss, git: FaGitAlt,
  python: FaPython, java: FaJava, html: FaHtml5, css: FaCss3Alt,
  'c++': SiCplusplus, 'c#': SiSharp, go: SiGo,
};

const getIconColor = (templateId: CardData['template']): string => {
  if (templateId === 'dark') {
    return 'text-gray-300 hover:text-white';
  }
  return 'text-gray-700 hover:text-indigo-500';
};

interface CardProps { data: CardData; }

export default function Card({ data }: CardProps) {
  // On trouve le modèle actuel à partir de son ID
  const currentTemplate = TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0];
  const iconColor = getIconColor(data.template);

  // Style conditionnel pour le texte, pour qu'il soit lisible sur tous les fonds
  const textColor = currentTemplate.id === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const subTextColor = currentTemplate.id === 'dark' ? 'text-gray-400' : 'text-gray-500';


  return (
    <div className={`w-[384px] h-[536px] rounded-2xl shadow-lg font-sans transition-all duration-300 ${currentTemplate.outerClassName}`}>
      <div className={`w-full h-full rounded-xl p-4 flex flex-col transition-all duration-300 ${currentTemplate.innerClassName}`}>
        {/* Header avec avatar et nom */}
        <div className="flex items-center space-x-4">
          <img
            src={data.avatarUrl}
            alt={`Avatar de ${data.name}`}
            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div>
            <h2 className={`text-2xl font-bold tracking-wide ${textColor}`}>{data.name}</h2>
            {data.location && (
              <div className={`flex items-center mt-1 text-sm ${subTextColor}`}>
                {/* ... (icône location) ... */}
                <span>{data.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className={`mt-4 text-sm h-16 ${currentTemplate.id === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{data.bio}</p>

        {/* Statistiques */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-100 p-2 rounded-lg">
            <div className="flex items-center justify-center text-lg font-bold text-indigo-600"><GoPerson className="mr-1.5" /> {data.followers}</div>
            <div className="text-xs text-gray-500">Followers</div>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg">
            <div className="flex items-center justify-center text-lg font-bold text-indigo-600"><GoRepo className="mr-1.5" /> {data.publicRepos}</div>
            <div className="text-xs text-gray-500">Dépôts</div>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg">
            <div className="flex items-center justify-center text-lg font-bold text-indigo-600"><GoStar className="mr-1.5" /> {data.totalStars}</div>
            <div className="text-xs text-gray-500">Étoiles</div>
          </div>
        </div>
        
         {/* Technologies */}
        <div className="mt-auto">
          <h3 className={`text-sm font-semibold mb-2 ${subTextColor}`}>Technologies Principales</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {data.topLanguages.map((lang) => {
              const IconComponent = iconMap[lang.toLowerCase()];
              {/* ... (logique des icônes) ... */}
              return IconComponent ? 
                <IconComponent key={lang} className={`text-4xl transition-colors ${iconColor}`} title={lang} /> 
                : <span key={lang} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{lang}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}