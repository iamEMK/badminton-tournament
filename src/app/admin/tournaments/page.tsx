'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  category: string;
}

export default function AdminTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTournaments = async () => {
    try {
      const response = await fetch('/api/tournaments');
      if (!response.ok) {
        throw new Error('Failed to fetch tournaments');
      }
      const data = await response.json();
      setTournaments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tournament?')) {
      return;
    }

    try {
      const response = await fetch(`/api/tournaments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tournament');
      }

      // Refresh the list
      fetchTournaments();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete tournament');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading tournaments...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Tournaments</h1>
        <Link
          href="/tournaments/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Tournament
        </Link>
      </div>
      {tournaments.length === 0 ? (
        <p className="text-gray-500">No tournaments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Name</th>
                <th className="border border-gray-300 p-3 text-left">Location</th>
                <th className="border border-gray-300 p-3 text-left">Venue</th>
                <th className="border border-gray-300 p-3 text-left">Category</th>
                <th className="border border-gray-300 p-3 text-left">Start Date</th>
                <th className="border border-gray-300 p-3 text-left">End Date</th>
                <th className="border border-gray-300 p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((tournament) => (
                <tr key={tournament.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{tournament.name}</td>
                  <td className="border border-gray-300 p-3">{tournament.location}</td>
                  <td className="border border-gray-300 p-3">{tournament.venue}</td>
                  <td className="border border-gray-300 p-3">{tournament.category.replace(/_/g, ' ')}</td>
                  <td className="border border-gray-300 p-3">
                    {new Date(tournament.startDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {new Date(tournament.endDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/tournaments/${tournament.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        View
                      </Link>
                      <Link
                        href={`/tournaments/${tournament.id}/edit`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(tournament.id)}
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
