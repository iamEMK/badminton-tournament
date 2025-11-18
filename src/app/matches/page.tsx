'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Match {
  id: string;
  round: string;
  scheduledTime: string;
  courtNumber: number | null;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'WALKOVER' | 'RETIRED' | 'CANCELLED';
  event: {
    name: string;
    tournament: {
      name: string;
      location: string;
    };
  };
  playerStats: Array<{
    player: {
      firstName: string;
      lastName: string;
      country: string;
    };
  }>;
  sets: Array<{
    setNumber: number;
    team1Score: number;
    team2Score: number;
  }>;
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches');
        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }
        const data = await response.json();
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading matches...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Matches</h1>
      {matches.length === 0 ? (
        <p className="text-gray-500">No matches scheduled yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <div key={match.id} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-3">
                <h2 className="text-xl font-semibold">{match.event.tournament.name}</h2>
                <p className="text-sm text-gray-600">{match.event.tournament.location}</p>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm"><span className="font-medium">Event:</span> {match.event.name.replace(/_/g, ' ')}</p>
                <p className="text-sm"><span className="font-medium">Round:</span> {match.round.replace(/_/g, ' ')}</p>
                {match.courtNumber && (
                  <p className="text-sm"><span className="font-medium">Court:</span> {match.courtNumber}</p>
                )}
                <p className="text-sm"><span className="font-medium">Time:</span> {new Date(match.scheduledTime).toLocaleString()}</p>
                {match.playerStats.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Players:</p>
                    <ul className="text-sm text-gray-700 ml-2">
                      {match.playerStats.map((ps, idx) => (
                        <li key={idx}>
                          {ps.player.firstName} {ps.player.lastName} ({ps.player.country})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {match.sets.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Score:</p>
                    <p className="text-sm text-gray-700">
                      {match.sets.map(set => `${set.team1Score}-${set.team2Score}`).join(', ')}
                    </p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  match.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                  match.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                  match.status === 'SCHEDULED' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {match.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex gap-2">
                <Link href={`/matches/${match.id}`} className="text-blue-500 hover:underline text-sm">
                  View Details →
                </Link>
                {match.status === 'IN_PROGRESS' && (
                  <Link href={`/matches/${match.id}/live`} className="text-green-500 hover:underline text-sm">
                    Live Score →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
