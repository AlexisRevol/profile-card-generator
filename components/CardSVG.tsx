// src/components/CardSVG.tsx

import type { CardData } from '@/types';
import { TEMPLATES } from '@/config/templates';
import { getProjectTypeIcon } from '@/utils/projectTypeHelper';
import {
  StyledText,
  StyledMultilineText,
  StatBadge,
  TechBadgeList,
  HeaderStat,
} from './card.components';
import {
  THEME_COLORS,
  LAYOUT,
  BIO_DEFAULTS,
  REPO_DEFAULTS,
  templateImages,
  CARD_WIDTH,
  CARD_PADDING,
} from './card.constants';

import { SiGithub } from 'react-icons/si';
import { GoStar, GoGitBranch, GoRepo } from 'react-icons/go';
import { calculateMultilineLayout } from '@/utils/card.utils';

interface CardSVGProps {
  data: CardData;
  avatarBase64: string;
}

export default function CardSVG({ data, avatarBase64 }: CardSVGProps) {
  const currentTemplate = TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0];
  const isDarkTheme = currentTemplate.theme === 'dark';
  const colors = isDarkTheme ? THEME_COLORS.dark : THEME_COLORS.light;

  // NOUVEAU : Déterminer la couleur de fond pour le dégradé de l'avatar
  let avatarFadeColor = '#FFFFFF'; // Par défaut pour les thèmes clairs
  if (currentTemplate.id === 'classic') {
    avatarFadeColor = '#F8FAFC';
  } else if (isDarkTheme) {
    avatarFadeColor = '#1F2937'; // Couleur de base du fond sombre
  }

  const bioLayout = calculateMultilineLayout(
    data.bio,
    BIO_DEFAULTS.maxWidth - BIO_DEFAULTS.paddingX * 2,
    BIO_DEFAULTS.fontSize,
    BIO_DEFAULTS.maxLines
  );

  const bioBgWidth = bioLayout.width + BIO_DEFAULTS.paddingX * 2;
  const bioBgHeight = bioLayout.height + BIO_DEFAULTS.paddingY * 2;
  const bioBgPath = `M 0 0 L ${bioBgWidth + BIO_DEFAULTS.skewAmount} 0 L ${bioBgWidth} ${bioBgHeight} L 0 ${bioBgHeight} Z`;
  

  return (
    <svg
      width="384"
      height="536"
      viewBox="0 0 384 536"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ colorScheme: 'light dark' }} 
    >
     <defs>
        <linearGradient id="avatarFadeGradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0.4" stopColor={avatarFadeColor} stopOpacity="0" />
            <stop offset="0.8" stopColor={avatarFadeColor} stopOpacity="1" />
        </linearGradient>

        <linearGradient id="badge-bg-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9FAFB" />
          <stop offset="100%" stopColor="#E5E7EB" />
        </linearGradient>

        <linearGradient id="badge-bg-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(80, 90, 110, 0.6)" />
          <stop offset="100%" stopColor="rgba(40, 50, 65, 0.6)" />
        </linearGradient>

        <linearGradient id="badge-bg-holographic" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(239, 225, 230, 0.7)" />
          <stop offset="100%" stopColor="rgba(239, 216, 228, 0.7)" />
        </linearGradient>


        <linearGradient id="tech-badge-shine-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" stopOpacity={isDarkTheme ? 0.3 : 1} />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0)" stopOpacity={isDarkTheme ? 0.1 : 0.5} />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="tech-badge-bg-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            stopColor={isDarkTheme ? 'rgba(80, 90, 110, 0.6)' : '#F9FAFB'}
          />
          <stop
            offset="100%"
            stopColor={isDarkTheme ? 'rgba(40, 50, 65, 0.6)' : '#E5E7EB'} 
          />
        </linearGradient>

        <linearGradient id="bio-reflect-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity={isDarkTheme ? "0.15" : "0.7"} />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="classic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>

        <pattern id="bg-holo" patternUnits="userSpaceOnUse" width="384" height="536">
          <image xlinkHref={templateImages.holographic} width="384" height="536" preserveAspectRatio="xMidYMid slice"/>
        </pattern>
        <pattern id="bg-blue" patternUnits="userSpaceOnUse" width="384" height="536">
          <image xlinkHref={templateImages.blue} width="384" height="536" preserveAspectRatio="xMidYMid slice"/>
        </pattern>
        <pattern id="bg-dark" patternUnits="userSpaceOnUse" width="384" height="536">
          <image xlinkHref={templateImages.dark} width="384" height="536" preserveAspectRatio="xMidYMid slice"/>
        </pattern>
      

        <clipPath id="card-border-clip">
          <rect x="8" y="8" width="368" height="520" rx="12" />
        </clipPath>

        <clipPath id="avatarClip">
          <circle cx="128" cy="128" r="128" />
        </clipPath>

        <linearGradient id="holo-badge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDarkTheme ? 'rgba(80, 70, 120, 0.4)' : 'rgba(230, 240, 255, 0.6)'} />
          <stop offset="50%" stopColor={isDarkTheme ? 'rgba(120, 110, 180, 0.7)' : 'rgba(255, 255, 255, 1)'} />
          <stop offset="100%" stopColor={isDarkTheme ? 'rgba(70, 100, 120, 0.4)' : 'rgba(220, 230, 255, 0.6)'} />
        </linearGradient>

        <filter id="text-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow 
              dx="3" 
              dy="3" 
              stdDeviation="2" 
              floodColor="#000000" 
              floodOpacity="0.5"   
            />
        </filter>
      </defs>

      {/* --- Card background --- */}
      <g>
        <rect width="384" height="536" rx="20" fill={ currentTemplate.id === 'classic' ? 'url(#classic-gradient)' : currentTemplate.id === 'holographic' ? 'url(#bg-holo)' : 'url(#bg-dark)' } />
        <rect 
            x="8" y="8" 
            width="368" height="520" 
            rx="12" 
            fill={
              currentTemplate.id === 'classic' ? '#F8FAFC' : // Pas de transparence, on garde la couleur
              currentTemplate.id === 'holographic' ? 'rgba(255, 255, 255, 0.70)' : // #FFFFFF avec 70% d'opacité
              currentTemplate.id === 'blue' ? 'rgba(255, 255, 255, 0.90)' : // #FFFFFF avec 90% d'opacité
              'rgba(31, 41, 55, 0.85)' // #1F2937 avec 85% d'opacité
            }
            // L'attribut fill-opacity n'est plus nécessaire !
          />
      </g>
      
      {/* --- Main group --- */}
      <g clipPath="url(#card-border-clip)">
         {/* --- Header --- */}
        <g transform={`translate(${LAYOUT.header.x}, ${LAYOUT.header.y})`}>
          <SiGithub size="24" fill={colors.icon} />
          <StyledText x={34} y={12} fontSize={18} fill={colors.mainText} stroke={colors.stroke}>
            @{data.githubUser}
          </StyledText>
          
          {data.publicRepos > 0 && (
            <HeaderStat
              value={data.publicRepos} 
              icon={GoRepo} 
              x={CARD_WIDTH - (LAYOUT.header.x * 2) - CARD_PADDING}
              y={12}
              colors={{
                text: colors.mainText,
                icon: colors.subText, 
                stroke: colors.stroke,
              }}
            />
          )}
        </g>

         {/* --- Bio --- */}
        <g transform={`translate(${LAYOUT.bio.x}, ${LAYOUT.bio.y})`}>
          <path d={bioBgPath} fill={colors.bioBg} />
          <path d={bioBgPath} fill="url(#bio-reflect-gradient)" />
          <StyledMultilineText
            text={data.bio || ''}
            x={BIO_DEFAULTS.paddingX}
            y={BIO_DEFAULTS.paddingY}
            maxWidth={BIO_DEFAULTS.maxWidth - BIO_DEFAULTS.paddingX * 2}
            fontSize={BIO_DEFAULTS.fontSize}
            fill={colors.bioText}
            stroke="none" 
          />
        </g>


        {/* --- Avatar --- */}
        <g transform={`translate(${LAYOUT.avatar.x}, ${LAYOUT.avatar.y})`}>
          <g clipPath="url(#avatarClip)">
            <image
              xlinkHref={avatarBase64}
              x="0" y="0" width="256" height="256"
            />
            <rect 
              x="0" y="0" width="256" height="256"
              fill="url(#avatarFadeGradient)"
            />
          </g>
          <circle 
            cx="128" cy="128" r="125" 
            fill="none"
            stroke={isDarkTheme ? '#1F2937' : '#FFFFFF'}
            strokeWidth="6"
          />
        </g>

        {/* --- Repositories --- */}
        <g transform={`translate(${LAYOUT.main.x}, ${LAYOUT.main.y})`}>
          {data.highlightedRepos?.slice(0, 3).map((repo, index) => {
            const yPos = index * REPO_DEFAULTS.itemSpacingY;
            const ProjectIcon = getProjectTypeIcon(repo.name, repo.description);
            return (
              <g key={repo.id} transform={`translate(0, ${yPos})`}>
                <ProjectIcon y="2" size="14" fill={colors.mainText} />
                <StyledText x={22} y={8} fontSize={14} fill={colors.mainText} stroke={colors.stroke}>
                  {repo.name.length > 25 ? `${repo.name.substring(0, 25)}...` : repo.name}
                </StyledText>
                <StyledMultilineText
                  text={repo.description || ''}
                  x={22} y={24}
                  maxWidth={REPO_DEFAULTS.descMaxWidth}
                  fontSize={11}
                  fill={colors.mainText}
                  stroke={colors.stroke}
                />
                <g transform="translate(285, 0)">
                  <StatBadge icon={GoStar} value={repo.stars} x={0} y={0} colors={colors.starBadge} />
                  <StatBadge icon={GoGitBranch} value={repo.forks} x={0} y={22} colors={colors.forkBadge} />
                </g>
              </g>
            );
          })}
        </g>
       
        {/* --- Footer (Technologies) --- */}
        <g transform={`translate(${LAYOUT.footer.x}, ${LAYOUT.footer.y})`}>
            <text y="0" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill={colors.subText} letterSpacing="0.05em">
                {'Technologies Favorites'.toUpperCase()}
            </text>
            <TechBadgeList
              languages={data.topLanguages}
              x={0}
              y={12}
              maxWidth={320}
              colors={currentTemplate.badgeColors}
            />
        </g>
      </g>
    </svg>
  );
}