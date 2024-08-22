'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  ranking: number;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Fetch players data here
    // For now, we'll use dummy data
    const fetchPlayers = async () => {
        try {
          const response = await fetch('/api/players');
          if (!response.ok) {
            throw new Error('Failed to fetch players');
          }
          const data = await response.json();
          setPlayers(data);
        } catch (err) {
          setError('An error occurred while fetching tournament statistics');
        } finally {
          setIsLoading(false);
        }
      };
      fetchPlayers()
    // setPlayers([
    //   { id: '1', firstName: 'John', lastName: 'Doe', country: 'USA', ranking: 1 },
    //   { id: '2', firstName: 'Jane', lastName: 'Smith', country: 'UK', ranking: 2 },
    // ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <Link href="/players/create" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Player
      </Link>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Country</th>
            <th className="border border-gray-300 p-2">Ranking</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="border border-gray-300 p-2">{`${player.firstName} ${player.lastName}`}</td>
              <td className="border border-gray-300 p-2">{player.country}</td>
              <td className="border border-gray-300 p-2">{player.ranking}</td>
              <td className="border border-gray-300 p-2">
                <Link href={`/players/${player.id}`} className="text-blue-500 hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
