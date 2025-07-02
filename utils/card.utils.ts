/**
 * Estime la largeur d'un texte de manière plus précise en tenant compte
 * de la largeur variable des caractères.
 * @param text Le texte à mesurer.
 * @param fontSize La taille de la police.
 * @returns Une largeur estimée en pixels.
 */
export function estimateTextWidth(text: string, fontSize: number): number {
  let totalWidth = 0;
  const narrowChars = /[1ijl.,]/g;
  const wideChars = /[WMwm]/g;

  for (const char of text) {
    if (char.match(narrowChars)) {
      totalWidth += fontSize * 0.4; // Les caractères étroits
    } else if (char.match(wideChars)) {
      totalWidth += fontSize * 0.9; // Les caractères larges
    } else {
      totalWidth += fontSize * 0.65; // Les caractères moyens
    }
  }
  return totalWidth;
}

const CHAR_WIDTH_FACTOR = 0.6; // Facteur d'estimation de la largeur des caractères

/**
 * Calcule la disposition du texte sur plusieurs lignes avec une limite de lignes et de largeur.
 * Ajoute "..." si le texte est tronqué.
 */
export const calculateMultilineLayout = (
  text: string | null,
  maxWidth: number,
  fontSize: number,
  maxLines: number,
  lineHeightFactor = 1.3
) => {
  const safeText = text || "No description available.";
  const words = safeText.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = testLine.length * fontSize * CHAR_WIDTH_FACTOR;
    
    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  lines.push(currentLine);

  // Appliquer la limite de lignes et ajouter "..." si nécessaire
  let finalLines = lines.slice(0, maxLines);
  if (lines.length > maxLines) {
    let lastLine = finalLines[maxLines - 1];
    // S'assurer que les "..." ne dépassent pas la largeur maximale
    while ((lastLine + "...").length * fontSize * CHAR_WIDTH_FACTOR > maxWidth && lastLine.length > 0) {
      lastLine = lastLine.slice(0, -1);
    }
    finalLines[maxLines - 1] = lastLine + "...";
  }

  // Calculer la largeur de la ligne la plus longue
  const calculatedWidth = Math.max(
    ...finalLines.map(line => line.length * fontSize * CHAR_WIDTH_FACTOR)
  );
  
  // Calculer la hauteur totale
  const calculatedHeight = finalLines.length * fontSize * lineHeightFactor - (fontSize * (lineHeightFactor - 1));

  return {
    lines: finalLines,
    width: calculatedWidth,
    height: calculatedHeight,
  };
};

/**
 * Formate un nombre en format compact (ex: 1200 -> 1.2K).
 */
export const formatStatNumber = (num: number): string => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(num);
};