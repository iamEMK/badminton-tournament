'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  ranking: number;
  dateOfBirth: string;
}

export default function PlayerDetailsPage() {
  const [player, setPlayer] = useState<Player | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // Fetch player data here based on the id
    // For now, we'll use dummy data
    setPlayer({
      id: id as string,
      firstName: 'John',
      lastName: 'Doe',
      country: 'USA',
      ranking: 1,
      dateOfBirth: '1990-01-01',
    });
  }, [id]);

  if (!player) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{`${player.firstName} ${player.lastName}`}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Player Information</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{`${player.firstName} ${player.lastName}`}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Country</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{player.country}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Ranking</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{player.ranking}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{player.dateOfBirth}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
