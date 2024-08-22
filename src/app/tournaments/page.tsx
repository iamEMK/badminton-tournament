'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
}

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    // Fetch tournaments data here
    // For now, we'll use dummy data
    setTournaments([
      { id: '1', name: 'Badminton World Championship', startDate: '2023-08-01', endDate: '2023-08-07', location: 'Tokyo, Japan' },
      { id: '2', name: 'European Badminton Cup', startDate: '2023-09-15', endDate: '2023-09-21', location: 'Paris, France' },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tournaments</h1>
      <Link href="/tournaments/create" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create New Tournament
      </Link>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{tournament.name}</h2>
            <p>Location: {tournament.location}</p>
            <p>Start Date: {tournament.startDate}</p>
            <p>End Date: {tournament.endDate}</p>
            <Link href={`/tournaments/${tournament.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
