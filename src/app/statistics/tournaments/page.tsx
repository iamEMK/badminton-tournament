'use client';

import { useState, useEffect } from 'react';

interface TournamentStats {
  id: string;
  name: string;
  totalMatches: number;
  completedMatches: number;
  // Add more fields as needed
}

export default function TournamentStatisticsPage() {
  const [tournamentStats, setTournamentStats] = useState<TournamentStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournamentStats = async () => {
      try {
        const response = await fetch('/api/statistics/tournaments');
        if (!response.ok) {
          throw new Error('Failed to fetch tournament statistics');
        }
        const data = await response.json();
        setTournamentStats(data);
      } catch (err) {
        setError('An error occurred while fetching tournament statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournamentStats();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tournament Statistics</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tournament
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total Matches
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Completed Matches
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Completion Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {tournamentStats.map((stat) => (
              <tr key={stat.id}>
                <td className="px-6 py-4 whitespace-nowrap">{stat.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stat.totalMatches}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stat.completedMatches}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* {((stat.complete */}
                  </td>
                  </tr>
            ))}
            </tbody>
            </table>
            </div>
            </div>
)}
