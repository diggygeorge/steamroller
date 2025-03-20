import type { NextApiRequest, NextApiResponse } from 'next';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { steamid } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_STEAM_API_KEY;

  if (!steamid) {
    return res.status(400).json({ error: 'Missing steamid' });
  }

  if (!apiKey) {
    console.error('Steam API key is not configured');
    return res.status(500).json({ error: 'Steam API key is not configured' });
  }

  try {
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamid}&include_appinfo=true&format=json`;
    console.log('Fetching from Steam API:', url);
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('Steam API error:', data);
      return res.status(response.status).json({ 
        error: 'Steam API request failed', 
        details: data 
      });
    }

    if (!data.response) {
      console.error('Invalid Steam API response:', data);
      return res.status(500).json({ 
        error: 'Invalid response from Steam API', 
        details: data 
      });
    }

    res.status(200).json(data);
  } catch (error: unknown) {
    console.error('Error in Steam API handler:', error);
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ 
      error: "Failed to fetch Steam data", 
      details: message 
    });
  }
}