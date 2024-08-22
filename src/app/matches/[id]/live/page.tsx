'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface LiveScore {
  matchId: string;
  player1: string;
  player2: string;
  sets: {
    player1Score: number;
    player2Score: number;
  }[];
  currentSet: number;
  currentGame: {
    player1Score: number;
    player2Score: number;
  };
}

export default function LiveScorePage() {
  const [liveScore, setLiveScore] = useState<LiveScore | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // In a real application, you would set up a WebSocket connection here
    // to receive real-time updates. For this example, we'll use an interval
    // to simulate updates.

    const fetchLiveScore = () => {
      // This would be replaced with a real API call
      const dummyScore: LiveScore = {
        matchId: id as string,
        player1: 'Player A',
        player2: 'Player B',
        sets: [
          { player1Score: 21, player2Score: 19 },
          { player1Score: 18, player2Score: 21 },
        ],
        currentSet: 2,
        currentGame: {
          player1Score: Math.floor(Math.random() * 21),
          player2Score: Math.floor(Math.random() * 21),
        },
      };
      setLiveScore(dummyScore);
    };

    fetchLiveScore(); // Initial fetch

    const intervalId = setInterval(fetchLiveScore, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [id]);

  if (!liveScore) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Live Score</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            {liveScore.player1} vs {liveScore.player2}
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {liveScore.sets.map((set, index) => (
              <div key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500">Set {index + 1}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {set.player1Score} - {set.player2Score}
                </dd>
              </div>
            ))}
            <div className="bg-green-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Current Game</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {liveScore.currentGame.player1Score} - {liveScore.currentGame.player2Score}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
