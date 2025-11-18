'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Player {
  id: string;
  bwfId: string;
  firstName: string;
  lastName: string;
  country: string;
  gender: string;
  playingStatus: string;
  statistics?: {
    currentWorldRanking: number | null;
  };
}

export default function AdminPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/players');
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      const data = await response.json();
      setPlayers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this player?')) {
      return;
    }

    try {
      const response = await fetch(`/api/players/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete player');
      }

      // Refresh the list
      fetchPlayers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete player');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading players...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Players</h1>
        <Link
          href="/players/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Player
        </Link>
      </div>
      {players.length === 0 ? (
        <p className="text-gray-500">No players found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">BWF ID</th>
                <th className="border border-gray-300 p-3 text-left">Name</th>
                <th className="border border-gray-300 p-3 text-left">Country</th>
                <th className="border border-gray-300 p-3 text-left">Gender</th>
                <th className="border border-gray-300 p-3 text-left">Status</th>
                <th className="border border-gray-300 p-3 text-left">Ranking</th>
                <th className="border border-gray-300 p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{player.bwfId}</td>
                  <td className="border border-gray-300 p-3">
                    {player.firstName} {player.lastName}
                  </td>
                  <td className="border border-gray-300 p-3">{player.country}</td>
                  <td className="border border-gray-300 p-3">{player.gender}</td>
                  <td className="border border-gray-300 p-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      player.playingStatus === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      player.playingStatus === 'INJURED' ? 'bg-yellow-100 text-yellow-800' :
                      player.playingStatus === 'RETIRED' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {player.playingStatus}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3">
                    {player.statistics?.currentWorldRanking || 'N/A'}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/players/${player.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        View
                      </Link>
                      <Link
                        href={`/players/${player.id}/edit`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(player.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
