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

  try {
    const response = await fetch(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamid}&include_appinfo=true&format=json`
    );

    if (!response.ok) {
      throw new Error(`Steam API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch Steam data", details: message });
  }
}
