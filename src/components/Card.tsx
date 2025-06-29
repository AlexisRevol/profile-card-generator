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

  // Définir des classes de texte ici pour éviter la répétition
  const textFloatEffect = 'text-shadow-float stroke-black/50 stroke-1';
  
  // Styles conditionnels pour la couleur de base du texte
  const mainTextColor = currentTemplate.id === 'dark' ? 'text-gray-100' : 'text-white';
  const subTextColor = currentTemplate.id === 'dark' ? 'text-gray-400' : 'text-gray-300';
  const iconColor = currentTemplate.id === 'dark' ? 'text-gray-300' : 'text-gray-200';

  return (
    <div className={`w-[384px] h-[536px] rounded-2xl shadow-lg font-sans transition-all duration-300 ${currentTemplate.outerClassName}`}>
      {/* Le conteneur intérieur est le référent absolu. On enlève le padding par défaut pour un contrôle total. */}
      <div className={`relative w-full h-full rounded-xl overflow-hidden ${currentTemplate.innerClassName}`}>

        {/* 1. Header: Icône + @username (positionné en haut à gauche) */}
        <header className="absolute top-6 left-6 flex items-center gap-2.5 z-10">
          <SiGithub className={`text-2xl ${iconColor}`} />
          <span className={`font-mono text-lg ${mainTextColor} ${textFloatEffect}`}>
            @{data.githubUser || 'github-user'}
          </span>
        </header>

        {/* 2. Avatar avec masque et bordures (positionné à droite) */}
        <div 
          className="absolute top-20 -right-8 w-64 h-64"
          style={{ maskImage: 'linear-gradient(to bottom left, black 50%, transparent 95%)' }}
        >
          <img
            src={data.avatarUrl}
            alt="Avatar"
            // Bordures semi-transparentes pour l'effet "smooth"
            className="w-full h-full object-cover rounded-full border-[10px] border-white/20"
          />
        </div>

        {/* Conteneur pour tout le texte de gauche, pour l'alignement */}
        <div className="absolute top-48 left-6 w-3/5 flex flex-col gap-5 z-10">
        
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

        {/* 5. Technologies favorites (positionné en bas à gauche) */}
        <div className="absolute bottom-6 left-6 z-10">
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${subTextColor}`}>
            Technologies Favorites
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            {data.topLanguages.map((lang) => {
              const IconComponent = iconMap[lang.toLowerCase()];
              return IconComponent ? (
                <IconComponent 
                  key={lang} 
                  className={`text-3xl transition-colors ${iconColor} hover:opacity-100 opacity-70`} 
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