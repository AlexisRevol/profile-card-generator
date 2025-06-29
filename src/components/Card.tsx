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
    : 'text-shadow-[0_2px_8px_rgba(0,0,0,0.2)] stroke-black/20 stroke-1';

  const mainTextColor = isDarkTheme ? 'text-gray-100' : 'text-gray-900';
  const subTextColor = isDarkTheme ? 'text-gray-400' : 'text-gray-600';
  const iconColor = isDarkTheme ? 'text-gray-300' : 'text-gray-800';
  const favIconColor = isDarkTheme ? 'text-gray-300' : 'text-gray-900';

return (
    <div 
      className={`
    @container w-full 
    aspect-[384/536] 
    rounded-2xl shadow-lg font-sans transition-all duration-300 ${currentTemplate.outerClassName}
  `}
    >
      <div className={`relative w-full h-full rounded-xl overflow-hidden ${currentTemplate.innerClassName}`}>

        {/* --- HEADER (inchangé) --- */}
        <header className="absolute top-3 left-3 @[22rem]:top-6 @[22rem]:left-6 flex items-center gap-1.5 @[22rem]:gap-2.5 z-10">
          <SiGithub className={`text-lg @[22rem]:text-2xl ${iconColor}`} />
          <span className={`font-mono text-sm @[22rem]:text-lg ${mainTextColor} ${textFloatEffect}`}>
            @{data.githubUser || 'github-user'}
          </span>
        </header>

        {/* --- AVATAR (inchangé) --- */}
        <div 
          className="absolute top-12 -right-4 w-36 h-36 @[22rem]:top-20 @[22rem]:-right-8 @[22rem]:w-64 @[22rem]:h-64"
          style={{ maskImage: 'linear-gradient(to bottom left, black 40%, transparent 80%)' }}
        >
          <img
            src={data.avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full border-4 @[22rem]:border-[6px] border-white/30"
          />
        </div>

        {/* --- CORPS PRINCIPAL --- */}
        <div className="absolute top-[48%] left-3 w-[65%] @[22rem]:top-64 @[22rem]:left-10 @[22rem]:w-3/5 flex flex-col gap-2 @[22rem]:gap-4 z-10 text-left">
        
          {/* CORRECTION ICI: Texte de la bio plus petit et moins espacé sur mobile */}
          <h2 className={`text-[10px] tracking-wide @[22rem]:text-base @[22rem]:tracking-wider font-bold uppercase ${mainTextColor} ${textFloatEffect}`}>
            {data.bio}
          </h2>

          <div className="space-y-1 @[22rem]:space-y-2">
            {data.customSkills.map((item) => (
              <div key={item.id}>
                <h3 className={`text-[8px] @[22rem]:text-[10px] font-bold uppercase tracking-wider ${subTextColor}`}>
                  {item.category}
                </h3>
                {/* CORRECTION ICI: Marge verticale supprimée sur mobile */}
                <p className={`text-[10px] @[22rem]:text-xs mt-0 @[22rem]:mt-0.5 ${mainTextColor} ${textFloatEffect}`}>
                  {item.skills}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- TECHNOLOGIES FAVORITES --- */}
        <div className="absolute bottom-3 left-3 @[22rem]:bottom-6 @[22rem]:left-6 z-10">
          {/* CORRECTION ICI: Titre encore plus petit sur mobile */}
          <h3 className={`text-[7px] @[22rem]:text-[10px] font-bold uppercase tracking-wider mb-1 @[22rem]:mb-2 ${subTextColor}`}>
            Technologies Favorites
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 @[22rem]:gap-3">
            {data.topLanguages.map((lang) => {
              const IconComponent = iconMap[lang.toLowerCase()];
              return IconComponent ? (
                <IconComponent 
                  key={lang} 
                  className={`text-lg @[22rem]:text-2xl transition-colors ${favIconColor} hover:opacity-100 opacity-80`} 
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