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