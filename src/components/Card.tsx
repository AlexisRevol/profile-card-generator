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

// NOTE : J'utilise un breakpoint de `24rem` (384px), qui est la taille maximale de notre carte.
  // La syntaxe `@<breakpoint>:` signifie "applique ce style lorsque le conteneur est plus grand que <breakpoint>".
  // Par défaut, nous aurons des valeurs plus petites pour les mobiles.

  return (
    <div 
      className={`
        @container/card w-full max-w-[384px] aspect-[384/536] 
        rounded-2xl shadow-lg font-sans transition-all duration-300 ${currentTemplate.outerClassName}
      `}
    >
      <div className={`relative w-full h-full rounded-xl overflow-hidden ${currentTemplate.innerClassName}`}>

        {/* --- HEADER --- */}
        {/* On réduit les marges et la taille du texte par défaut */}
        <header className="absolute top-4 left-4 @[24rem]/card:top-6 @[24rem]/card:left-6 flex items-center gap-2 @[24rem]/card:gap-2.5 z-10">
          <SiGithub className={`text-xl @[24rem]/card:text-2xl ${iconColor}`} />
          <span className={`font-mono text-base @[24rem]/card:text-lg ${mainTextColor} ${textFloatEffect}`}>
            @{data.githubUser || 'github-user'}
          </span>
        </header>

        {/* --- AVATAR --- */}
        {/* On réduit drastiquement la taille et le positionnement de l'avatar par défaut */}
        <div 
          className="absolute top-16 -right-6 w-48 h-48 @[24rem]/card:top-20 @[24rem]/card:-right-8 @[24rem]/card:w-64 @[24rem]/card:h-64"
          style={{ maskImage: 'linear-gradient(to bottom left, black 40%, transparent 80%)' }}
        >
          <img
            src={data.avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full border-4 @[24rem]/card:border-[6px] border-white/30"
          />
        </div>

        {/* --- CORPS PRINCIPAL --- */}
        {/* On ajuste le positionnement, la largeur, l'espacement et la taille du texte */}
        <div className="absolute top-56 left-5 w-[60%] @[24rem]/card:top-64 @[24rem]/card:left-10 @[24rem]/card:w-3/5 flex flex-col gap-3 @[24rem]/card:gap-4 z-10 text-left">
        
          {/* Titre du Job (Bio) */}
          {/* text-sm par défaut, text-base sur les grandes cartes */}
          <h2 className={`text-sm @[24rem]/card:text-base font-bold uppercase tracking-wider ${mainTextColor} ${textFloatEffect}`}>
            {data.bio}
          </h2>

          {/* Compétences personnalisées */}
          <div className="space-y-1.5 @[24rem]/card:space-y-2">
            {data.customSkills.map((item) => (
              <div key={item.id}>
                {/* On utilise text-[9px] au lieu de text-[10px] pour une meilleure échelle */}
                <h3 className={`text-[9px] @[24rem]/card:text-[10px] font-bold uppercase tracking-wider ${subTextColor}`}>
                  {item.category}
                </h3>
                {/* text-[11px] par défaut, text-xs (12px) sur les grandes cartes */}
                <p className={`text-[11px] @[24rem]/card:text-xs mt-0.5 ${mainTextColor} ${textFloatEffect}`}>
                  {item.skills}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* --- TECHNOLOGIES FAVORITES --- */}
        {/* On ajuste tout : position, marges, espacement, taille des icônes */}
        <div className="absolute bottom-4 left-4 @[24rem]/card:bottom-6 @[24rem]/card:left-6 z-10">
          <h3 className={`text-[9px] @[24rem]/card:text-[10px] font-bold uppercase tracking-wider mb-1.5 @[24rem]/card:mb-2 ${subTextColor}`}>
            Technologies Favorites
          </h3>
          <div className="flex flex-wrap items-center gap-2 @[24rem]/card:gap-3">
            {data.topLanguages.map((lang) => {
              const IconComponent = iconMap[lang.toLowerCase()];
              return IconComponent ? (
                <IconComponent 
                  key={lang} 
                  className={`text-xl @[24rem]/card:text-2xl transition-colors ${favIconColor} hover:opacity-100 opacity-80`} 
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