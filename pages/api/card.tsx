import type { VercelRequest, VercelResponse } from '@vercel/node';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { fetchGithubUserData } from '@/services/githubService';
import CardSVG from '@/components/CardSVG';
import { fetchImageAsBase64 } from '@/utils/imageUtils'; 

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { user, template } = req.query;

    if (!user || typeof user !== 'string') {
      return res.status(400).send('Le paramètre "user" est manquant.');
    }

    // Get github data
    const cardData = await fetchGithubUserData(user);
    if (template && typeof template === 'string') {
        cardData.template = template as any;
    }
    const avatarBase64 = await fetchImageAsBase64(cardData.avatarUrl);

    // Render SVG component to string format
    const svgString = ReactDOMServer.renderToStaticMarkup(
      <CardSVG data={cardData} avatarBase64={avatarBase64} />
    );

    // Return data
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).send(svgString);

  } catch (error: any) {
    console.error(error);
    res.status(500).send(`Une erreur est survenue: ${error.message}`);
  }
}