// src/components/Card.tsx

import type { CardData } from '../types';
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

interface CardProps { data: CardData; }

export default function Card({ data }: CardProps) {
  return (
    <div className="w-[384px] h-[536px] p-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl shadow-lg font-sans">
      <div className="w-full h-full bg-slate-50 rounded-xl p-4 flex flex-col">
        {/* Header avec avatar et nom */}
        <div className="flex items-center space-x-4">
          <img
            src={data.avatarUrl}
            alt={`Avatar de ${data.name}`}
            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-wide">{data.name}</h2>
            {data.location && (
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <GoLocation className="mr-1" />
                <span>{data.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-gray-700 h-16">{data.bio}</p>

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
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Technologies Principales</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {data.topLanguages.map((lang) => {
              const IconComponent = iconMap[lang.toLowerCase()];
              return IconComponent ? 
                <IconComponent key={lang} className="text-4xl text-gray-700 hover:text-indigo-500 transition-colors" title={lang} /> 
                : <span key={lang} className="text-sm bg-gray-200 px-2 py-1 rounded">{lang}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}