// api/card.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { fetchGithubUserData } from '../../services/githubService';
import CardSVG from '../../components/CardSVG';
import { fetchImageAsBase64 } from '../../utils/imageUtils'; // Le chemin peut varier

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { user, template } = req.query;

    if (!user || typeof user !== 'string') {
      return res.status(400).send('Le paramètre "user" est manquant.');
    }

    // 1. Récupérer les données de GitHub
    const cardData = await fetchGithubUserData(user);
    // On applique le template demandé par l'URL
    if (template && typeof template === 'string') {
        cardData.template = template as any;
    }

    // 2. Récupérer l'avatar en Base64
    const avatarBase64 = await fetchImageAsBase64(cardData.avatarUrl);

    // 3. Rendre le composant SVG en une chaîne de caractères
    const svgString = ReactDOMServer.renderToStaticMarkup(
      <CardSVG data={cardData} avatarBase64={avatarBase64} />
    );

    // 4. Envoyer la réponse SVG
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); // Cache d'1h
    res.status(200).send(svgString);

  } catch (error: any) {
    console.error(error);
    res.status(500).send(`Une erreur est survenue: ${error.message}`);
  }
}