// Mettez ceci dans un fichier d'utilitaires, par ex: /src/utils/imageUtils.ts
export async function fetchImageAsBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Échec de la récupération de l'image : ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/png';
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'image depuis ${url}:`, error);
    // Retourner une image de remplacement en Base64 ou lancer une erreur
    // Ici, nous relançons l'erreur pour que l'API principale puisse la gérer.
    throw error;
  }
}