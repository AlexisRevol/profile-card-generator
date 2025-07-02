// src/components/card/card.components.tsx
import React from 'react';
import { FONT_FAMILY_SANS } from './card.constants';
import { calculateMultilineLayout, formatStatNumber } from './card.utils';

// --- Text Components ---

// Texte simple avec un contour pour la lisibilité
export const StyledText: React.FC<{
    children: React.ReactNode;
    x: number;
    y: number;
    fontSize: number;
    fontFamily?: string;
    fontWeight?: string | number;
    fill: string;
    stroke: string;
  }> = ({ children, x, y, fontSize, fontFamily, fontWeight, fill, stroke }) => {
    return (
      <text
        x={x}
        y={y}
        fontFamily={fontFamily || "sans-serif"}
        fontSize={fontSize}
        fontWeight={fontWeight || "bold"}
        fill={fill}
        stroke={stroke}
        strokeWidth={fontSize / 12}
        strokeLinejoin="round"
        paintOrder="stroke"
        dominantBaseline="middle"
      >
        {children}
      </text>
    );
  };
  
// Texte multiligne avec contour
export function StyledMultilineText(props: {
  text: string;
  x: number;
  y: number;
  maxWidth: number;
  maxLines?: number;
  fontSize: number;
  fontWeight?: string | number;
  fill: string;
  stroke: string;
  lineHeightFactor?: number;
}) {
  const { text, x, y, maxWidth, fontSize, fontWeight, fill, stroke, maxLines = 2, lineHeightFactor = 1.3, ...styleProps } = props;

  // ON RÉUTILISE NOTRE UTILITAIRE ! Plus de logique dupliquée.
  const { lines } = calculateMultilineLayout(text, maxWidth, fontSize, maxLines, lineHeightFactor);

  return (
    <text
      x={x}
      y={y}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fill={fill}
      fontFamily={FONT_FAMILY_SANS}
      stroke={stroke}
      strokeWidth={fontSize / 12}
      strokeLinejoin="round"
      paintOrder="stroke"
      dominantBaseline="hanging"
      {...styleProps}
    >
      {lines.map((line, index) => (
        <tspan key={index} x={x} dy={index === 0 ? 0 : fontSize * lineHeightFactor}>
          {line}
        </tspan>
      ))}
    </text>
  );
};


// --- Badge Components ---

export const StatBadge = ({ icon: Icon, value, x, y, colors }: { icon: React.ElementType, value: number, x: number, y: number, colors: { bg: string, text: string } }) => {
  const FONT_SIZE = 10;
  const PADDING_X = 8;
  const ICON_SIZE = 12;
  const ICON_MARGIN_RIGHT = 4;
  const formattedValue = formatStatNumber(value);
  const textWidth = formattedValue.length * FONT_SIZE * 0.6;
  const badgeWidth = PADDING_X + ICON_SIZE + ICON_MARGIN_RIGHT + textWidth + PADDING_X;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width={badgeWidth} height="18" rx="9" fill={colors.bg} />
      <Icon x={PADDING_X} y="3" size={ICON_SIZE} fill={colors.text} />
      <text x={PADDING_X + ICON_SIZE + ICON_MARGIN_RIGHT} y="13" fontFamily="sans-serif" fontSize={FONT_SIZE} fontWeight="500" fill={colors.text}>
        {formattedValue}
      </text>
    </g>
  );
};

const TechBadge = ({ label, x, y, colors }: { label: string, x: number, y: number, colors: TechBadgeColors }) => {
  const FONT_SIZE = 10;
  const PADDING_X = 8;
  const PADDING_Y = 4;
  const BADGE_HEIGHT = FONT_SIZE + PADDING_Y * 2;
  const textWidth = label.length * FONT_SIZE * 0.6;
  const badgeWidth = textWidth + PADDING_X * 2;
  const badgeRadius = 6;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Ombre portée */}
      <rect
        x="0.5" y="1" width={badgeWidth} height={BADGE_HEIGHT}
        rx={badgeRadius}
        fill={'rgba(0,0,0,0.1)'}
        filter="url(#text-shadow)"
      />

      {/* MODIFIÉ : La couche de fond utilise maintenant l'ID dynamique */}
      <rect
        width={badgeWidth} height={BADGE_HEIGHT}
        rx={badgeRadius}
        fill={`url(#${colors.backgroundGradientId})`} // <-- UTILISATION DYNAMIQUE !
        stroke={colors.borderOuter}
        strokeWidth="0.5"
      />

      {/* Bordure intérieure */}
      <rect
        x="0.5" y="0.5" width={badgeWidth - 1} height={BADGE_HEIGHT - 1}
        rx={badgeRadius - 0.5}
        fill="none"
        stroke={colors.borderInner}
        strokeWidth="0.5"
      />
      
      {/* Reflet (inchangé) */}
      <rect
        x="0.5" y="0.5" width={badgeWidth - 1} height={(BADGE_HEIGHT - 1) / 2}
        rx={badgeRadius - 0.5} ry={badgeRadius - 0.5}
        fill="url(#tech-badge-shine-gradient)"
      />

      {/* Texte (inchangé) */}
      <text
        x={badgeWidth / 2} y={BADGE_HEIGHT / 2}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily={FONT_FAMILY_SANS} fontSize={FONT_SIZE} fontWeight="600"
        fill={colors.text}
        style={{
          paintOrder: 'stroke',
          stroke: 'rgba(0,0,0,0.4)',
          strokeWidth: 0.5,
          opacity: 0.9,
        }}
      >
        {label}
      </text>
    </g>
  );
};


interface TechBadgeColors {
  text: string;
  borderOuter: string;
  borderInner: string;
  backgroundGradientId: string;
}

// ÉTAPE 2: Définir le type pour les props de TechBadgeList
interface TechBadgeListProps {
  languages: string[];
  x: number;
  y: number;
  maxWidth: number;
  colors: TechBadgeColors; // On réutilise l'interface précédente
}

// --- CORRIGÉ : Composant pour la liste des badges technologiques ---
// Gère la logique de placement complexe
// ÉTAPE 3: Appliquer le type à la fonction
export function TechBadgeList({
  languages,
  x,
  y,
  maxWidth,
  colors,
}: TechBadgeListProps) { // <-- On utilise le type que l'on vient de définir
  const badges: React.ReactNode[] = [];
  let currentX = 0;
  let currentY = 0;
  const gap = 6;
  const lineHeight = 24;

  // Le reste du code de la fonction est correct
  languages.slice(0, 8).forEach((lang) => {
    const FONT_SIZE = 10;
    const PADDING_X = 8;
    const textWidth = lang.length * FONT_SIZE * 0.6;
    const badgeWidth = textWidth + PADDING_X * 2;

    if (currentX + badgeWidth > maxWidth) {
      currentX = 0;
      currentY += lineHeight;
    }

    if (currentY >= lineHeight * 2) {
      return;
    }

    // Le `TechBadge` ici sera maintenant correctement typé
    badges.push(
      <TechBadge key={lang} label={lang} x={currentX} y={currentY} colors={colors} />
    );
    currentX += badgeWidth + gap;
  });

  return <g transform={`translate(${x}, ${y})`}>{badges}</g>;
}