'use client';

import { useState, useEffect } from 'react';

interface PlayerStats {
  id: string;
  player: {
    id: string;
    firstName: string;
    lastName: string;
  };
  matchesPlayed: number;
  matchesWon: number;
  totalPoints: number;
}

export default function PlayerStatisticsPage() {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch('/api/statistics/players');
        if (!response.ok) {
          throw new Error('Failed to fetch player statistics');
        }
        const data = await response.json();
        setPlayerStats(data);
      } catch (err) {
        setError('An error occurred while fetching player statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerStats();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Player Statistics</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Player
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Matches Played
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Matches Won
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total Points
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Win Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {playerStats.map((stat) => (
              <tr key={stat.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stat.player.firstName} {stat.player.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{stat.matchesPlayed}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stat.matchesWon}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stat.totalPoints}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {((stat.matchesWon / stat.matchesPlayed) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
