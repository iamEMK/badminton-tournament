'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Match {
  id: string;
  tournamentName: string;
  players: string[];
  scheduledTime: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED';
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Fetch matches data here
    // For now, we'll use dummy data
    setMatches([
      { id: '1', tournamentName: 'Badminton World Championship', players: ['Player A', 'Player B'], scheduledTime: '2023-08-01T14:00:00Z', status: 'SCHEDULED' },
      { id: '2', tournamentName: 'European Badminton Cup', players: ['Player C', 'Player D'], scheduledTime: '2023-08-02T15:30:00Z', status: 'IN_PROGRESS' },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <div key={match.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{match.tournamentName}</h2>
            <p>Players: {match.players.join(' vs ')}</p>
            <p>Scheduled Time: {new Date(match.scheduledTime).toLocaleString()}</p>
            <p>Status: {match.status}</p>
            <Link href={`/matches/${match.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
              View Details
            </Link>
            {match.status === 'IN_PROGRESS' && (
              <Link href={`/matches/${match.id}/live`} className="text-green-500 hover:underline mt-2 ml-4 inline-block">
                Live Score
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
