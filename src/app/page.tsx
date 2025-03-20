"use client";
import { useState } from 'react';



export default function Home() {

  interface SteamData {
    response?: {
      game_count?: number;
      games?: {
        name: string;
        appid: number;
        playtime_forever: number;
      }[];
    };
  }

  const [steamID, setSteamID] = useState("");
  const [data, setData] = useState<SteamData | null>(null);
  const [isFound, setFound] = useState(-1);
  const [err, setError] = useState<string | null>(null);
  

  const openWinSteam = (redirect: string) => {
    try {
        const endPoint = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${redirect}/steam-callback.html&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
        const strWindowFeatures = 'location=yes,height=660,width=540,scrollbars=no,status=yes';
        const steamWindow = window.open(endPoint,
            'steamLoginNav',
            strWindowFeatures
        );

        if (steamWindow != null) {
            const closeWindow = () => {
                steamWindow.close();
            };

            window.addEventListener('message', function(event) {
                // Verify the origin matches our domain
                if (event.origin !== 'https://steamroller.vercel.app') return;

                const search = event.data;
                if (search) {
                    const errorRegex = search.match(/error=([^&]*)/);
                    const steamIDRegex = search.match(/openid%2Fid%2F([^&]*)/);
                    
                    if (steamIDRegex) {
                        const ID = steamIDRegex[1];
                        if (ID) {
                            closeWindow();
                            setSteamID(ID);
                            getStats();
                        }
                    }
                    
                    if (!steamIDRegex && errorRegex) {
                        setError(errorRegex[1]);
                        if (errorRegex[1] === 'access_denied') {
                            closeWindow();
                            setSteamID("");
                        }
                    }
                }
            }, false);
        }
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
            console.log(err);
            setSteamID("");
            return null;
        } else {
            throw error;
        }
    }
  }

  async function getStats() {
    if (!steamID) {
      setError("Failed to retrieve Steam ID.");
      setFound(-1);
      return;
    }  
    try {
      const response = await fetch(`/api/steam?steamid=${steamID}`);
      const json = await response.json();
  
      if (!response.ok) {
        throw new Error(json.error || 'Failed to fetch Steam data');
      }

      if (json.response && json.response.games) {
        setFound(1);
        setData(json);
        setError(null);
      } else {
        setError('No game data available for this account');
        setFound(-1);
      }
    } catch (error) {
      setFound(-1);
      setError(error instanceof Error ? error.message : 'An error occurred while fetching Steam data');
      console.error("Error fetching Steam data:", error);
    }
  }

  return (
    <div className="bg-[#262A37] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <div>
          <h1 className="text-6xl pb-[20px]">Steamroller</h1>
          <div className="m-auto text-center">
            <button onClick={() => openWinSteam("https://steamroller.vercel.app")} className="bg-[#1B1D25] rounded-sm border-1 p-2 hover:bg-[#111215] hover:cursor-pointer">
              Sign in With Steam
            </button>
          </div>
          <div className="pt-[50px] text-center">
            {err && (
              <div className="text-red-500 mb-4">
                {err}
              </div>
            )}
            {isFound > -1 ? 
            (data && data.response?.games ? (
              <>
                <p className="text-2xl underline pb-[20px]">Games Owned:</p>
                <ul>
                  {data.response.games.map((game) => (
                    <li key={game.appid}>{game.name}: {Math.round(game.playtime_forever / 60 * 100) / 100} hours</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No game data available.</p>
            ))
            : <p></p>}
          </div>
        </div>
    </div>
  );
}