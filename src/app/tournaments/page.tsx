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

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchTournaments();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading tournaments...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tournaments</h1>
      <Link href="/tournaments/create" className="bg-green-500 text-white px-4 py-2 rounded mb-6 inline-block hover:bg-green-600">
        Create New Tournament
      </Link>
      {tournaments.length === 0 ? (
        <p className="text-gray-500 mt-4">No tournaments found. Create one to get started!</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-3">{tournament.name}</h2>
              <div className="space-y-1 text-gray-600">
                <p><span className="font-medium">Location:</span> {tournament.location}</p>
                <p><span className="font-medium">Venue:</span> {tournament.venue}</p>
                <p><span className="font-medium">Category:</span> {tournament.category.replace(/_/g, ' ')}</p>
                <p><span className="font-medium">Start:</span> {new Date(tournament.startDate).toLocaleDateString()}</p>
                <p><span className="font-medium">End:</span> {new Date(tournament.endDate).toLocaleDateString()}</p>
              </div>
              <Link href={`/tournaments/${tournament.id}`} className="text-blue-500 hover:underline mt-4 inline-block">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
