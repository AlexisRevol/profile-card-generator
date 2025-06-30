// src/components/Card.tsx

import type { CardData, SkillCategory  } from '../types';
import { TEMPLATES } from '../config/templates'; // On importe nos modèles
import { FaReact, FaNodeJs, FaFigma, FaGitAlt, FaPython, FaJava, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiTypescript, SiVite, SiTailwindcss, SiCplusplus, SiSharp, SiGo, SiGithub } from 'react-icons/si';
import { GoRepo, GoStar, GoPerson, GoLocation, GoGitBranch } from 'react-icons/go';
import { getProjectTypeIcon } from '../utils/projectTypeHelper';
import { FaFire } from 'react-icons/fa';

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
  const accentColor = isDarkTheme ? 'text-indigo-400' : 'text-indigo-600';
  const fireColor = 'text-orange-500 dark:text-orange-400';

return (
    <div 
        className={`
          @container 
          w-full max-w-[300px]  // 🔥 Ajoute cette limite
          mx-auto
          aspect-[384/536] 
          rounded-2xl shadow-lg 
          font-sans transition-all duration-300 ${currentTemplate.outerClassName}
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

        {/* --- CORPS PRINCIPAL - VERSION AMÉLIORÉE --- */}
{/*
  CHANGEMENTS CLÉS :
  - Positionnement (top) : On passe de 48% à une valeur fixe plus haute sur mobile, qui s'ajuste ensuite.
    `top-[160px]` est une bonne base pour la vue la plus petite.
    `@[22rem]:top-64` reste notre point de référence pour les écrans plus grands.
  - Largeur (w) : On donne plus d'espace.
    `w-[70%]` sur mobile pour occuper plus d'espace horizontal.
    `@[22rem]:w-[65%]` sur grand écran pour ne pas chevaucher l'avatar qui est plus gros.
  - Marge (left) : On l'ajuste pour être cohérent avec le header.
    `left-3` -> `left-4 @[22rem]:left-6`.
  - Espacement (gap) : On affine l'espacement vertical entre la bio et les dépôts.
    `gap-2 @[22rem]:gap-4` -> `gap-3 @[22rem]:gap-4`.
*/}
<div className="absolute top-[160px] left-4 w-[70%] @[22rem]:top-64 @[22rem]:left-6 @[22rem]:w-[65%] flex flex-col gap-3 @[22rem]:gap-4 z-10 text-left">

  {/* La bio reste la même, elle s'adapte bien */}
  <h2 className={`text-[14px] tracking-wide @[22rem]:text-base @[22rem]:tracking-wider font-bold uppercase ${mainTextColor} ${textFloatEffect}`}>
    {data.bio}
  </h2>

  {/* 
    La section des dépôts est déjà bien, les changements ci-dessus lui donneront
    plus d'espace pour respirer. L'espacement interne est juste légèrement ajusté.
  */}
   <div className="space-y-2 @[22rem]:space-y-3">
              {/* On utilise l'index du map pour la flamme ! */}
              {/* ON AJOUTE UN FILTRE POUR IGNORER LES DÉPÔTS INCOMPLETS */}
              {data.highlightedRepos?.filter(repo => repo && repo.id).slice(0, 3).map((repo, index) => {
                // On appelle notre fonction magique ici !
                const ProjectIcon = getProjectTypeIcon(repo.name, repo.description);
                
                return (
                  // On englobe chaque item dans un conteneur flex pour l'icône
                  <div key={repo.id} className="flex items-start gap-2 @[22rem]:gap-3">
                    
                    {/* Colonne de l'icône de projet */}
                    <div className="mt-0.5 @[22rem]:mt-1">
                      <ProjectIcon className={`text-sm @[22rem]:text-base ${subTextColor} transition-colors`} />
                    </div>
                    
                    {/* Contenu du projet (le reste) */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          {/* 
                            On ajoute la flamme sur le premier item (index === 0)
                            C'est un flex container pour aligner le nom et la flamme
                          */}
                          <div className="flex items-center gap-1.5">
                            <h3 className={`text-[10px] @[22rem]:text-[12px] font-bold ${mainTextColor} ${textFloatEffect} truncate`}>
                              {repo.name}
                            </h3>
                            {index === 0 && (
                              <FaFire className={`flex-shrink-0 text-xs @[22rem]:text-sm ${fireColor}`} />
                            )}
                          </div>
                          <p className={`text-[8.5px] @[22rem]:text-[11px] mt-0 @[22rem]:mt-0.5 ${subTextColor} h-6 @[22rem]:h-auto overflow-hidden`}>
                            {repo.description || "Aucune description."}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          {/* ... la partie avec les badges de stats ne change pas ... */}
                          <div className="flex flex-col items-end gap-1 mt-0.5">
                            <div className={`flex items-center gap-1 text-[8px] @[22rem]:text-[10px] font-medium rounded-full px-1.5 @[22rem]:px-2 py-0.5 ${isDarkTheme ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                              <GoStar />
                              <span>{repo.stars}</span>
                            </div>
                            <div className={`flex items-center gap-1 text-[8px] @[22rem]:text-[10px] font-medium rounded-full px-1.5 @[22rem]:px-2 py-0.5 ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                              <GoGitBranch />
                              <span>{repo.forks}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
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