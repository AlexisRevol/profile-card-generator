// src/components/Card.tsx

import type { CardData, SkillCategory  } from '../types';
import { TEMPLATES } from '../config/templates'; // On importe nos modèles
import { FaReact, FaNodeJs, FaFigma, FaGitAlt, FaPython, FaJava, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiTypescript, SiVite, SiTailwindcss, SiCplusplus, SiSharp, SiGo, SiGithub } from 'react-icons/si';
import { GoRepo, GoStar, GoPerson, GoLocation } from 'react-icons/go';

// Enrichissons notre dictionnaire d'icônes
const iconMap: { [key: string]: React.ComponentType<any> } = {
  react: FaReact, typescript: SiTypescript, javascript: FaJs,
  node: FaNodeJs, figma: FaFigma, vite: SiVite, tailwind: SiTailwindcss, git: FaGitAlt,
  python: FaPython, java: FaJava, html: FaHtml5, css: FaCss3Alt,
  'c++': SiCplusplus, 'c#': SiSharp, go: SiGo, 'github': SiGithub,
};

const getIconColor = (templateId: CardData['template']): string => {
  if (templateId === 'dark') {
    return 'text-gray-300 hover:text-white';
  }
  return 'text-gray-700 hover:text-indigo-500';
};

interface CardProps { data: CardData; }

export default function Card({ data }: CardProps) {
  const currentTemplate = TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0];
  const isDarkTheme = currentTemplate.theme === 'dark';

  const textFloatEffect = isDarkTheme 
    ? 'text-shadow-float stroke-black/50 stroke-1' 
    : 'text-shadow-[0_2px_8px_rgba(0,0,0,0.2)] stroke-black/20 stroke-1'; // J'ai ajusté l'ombre claire pour un meilleur rendu sur fond clair

  const mainTextColor = isDarkTheme ? 'text-gray-100' : 'text-gray-900';
  const subTextColor = isDarkTheme ? 'text-gray-400' : 'text-gray-600';
  const iconColor = isDarkTheme ? 'text-gray-300' : 'text-gray-800';
  const favIconColor = isDarkTheme ? 'text-gray-300' : 'text-gray-900';

  return (
    <div className={`w-[384px] h-[536px] rounded-2xl shadow-lg font-sans transition-all duration-300 ${currentTemplate.outerClassName}`}>
      <div className={`relative w-full h-full rounded-xl overflow-hidden ${currentTemplate.innerClassName}`}>

        {/* 1. Header: Icône + @username */}
        <header className="absolute top-6 left-6 flex items-center gap-2.5 z-10">
          <SiGithub className={`text-2xl ${iconColor}`} />
          <span className={`font-mono text-lg ${mainTextColor} ${textFloatEffect}`}>
            @{data.githubUser || 'github-user'}
          </span>
        </header>

        {/* 2. Avatar avec masque et bordures (masque renforcé) */}
        <div 
          className="absolute top-20 -right-8 w-64 h-64"
          style={{ maskImage: 'linear-gradient(to bottom left, black 40%, transparent 80%)' }}
        >
          <img
            src={data.avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full border-[6px] border-white/30"
          />
        </div>

        {/* Conteneur de texte (nettement plus bas) */}
        <div className="absolute top-64 left-6 w-3/5 flex flex-col gap-5 z-10">
        
          {/* 3. Titre du Job (Bio) */}
          <h2 className={`text-base font-bold uppercase tracking-wider ${mainTextColor} ${textFloatEffect}`}>
            {data.bio}
          </h2>

          {/* 4. Compétences personnalisées */}
          <div className="space-y-4">
            {data.customSkills.map((item) => (
              <div key={item.id}>
                <h3 className={`text-xs font-bold uppercase tracking-wider ${subTextColor}`}>
                  {item.category}
                </h3>
                <p className={`text-sm mt-0.5 ${mainTextColor} ${textFloatEffect}`}>
                  {item.skills}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* 5. Technologies favorites */}
        <div className="absolute bottom-6 left-6 z-10">
          <h3 className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${subTextColor}`}>
            Technologies Favorites
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            {data.topLanguages.map((lang) => {
              const IconComponent = iconMap[lang.toLowerCase()];
              return IconComponent ? (
                <IconComponent 
                  key={lang} 
                  className={`text-2xl transition-colors ${favIconColor} hover:opacity-100 opacity-80`} 
                  title={lang} 
                />
              ) : null;
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
