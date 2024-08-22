'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Match {
  id: string;
  tournamentName: string;
  players: string[];
  scheduledTime: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED';
  court: string;
  result?: string;
}

export default function MatchDetailsPage() {
  const [match, setMatch] = useState<Match | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // Fetch match data here based on the id
    // For now, we'll use dummy data
    setMatch({
      id: id as string,
      tournamentName: 'Badminton World Championship',
      players: ['Player A', 'Player B'],
      scheduledTime: '2023-08-01T14:00:00Z',
      status: 'IN_PROGRESS',
      court: 'Court 1',
    });
  }, [id]);

  if (!match) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Match Details</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{match.tournamentName}</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Players</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{match.players.join(' vs ')}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Scheduled Time</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(match.scheduledTime).toLocaleString()}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{match.status}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Court</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{match.court}</dd>
            </div>
            {match.result && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Result</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{match.result}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      {match.status === 'IN_PROGRESS' && (
        <div className="mt-4">
          <Link href={`/matches/${id}/live`} className="bg-green-500 text-white px-4 py-2 rounded">
            View Live Score
          </Link>
        </div>
      )}
    </div>
  );
}
