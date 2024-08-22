'use client';

import { useState, useEffect } from 'react';

export default function AdminTournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    // Fetch tournaments data here
    // setTournaments(fetchedTournaments);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Tournaments</h1>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4">Add New Tournament</button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Start Date</th>
            <th className="border border-gray-300 p-2">End Date</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament:any) => (
            <tr key={tournament.id}>
              <td className="border border-gray-300 p-2">{tournament.id}</td>
              <td className="border border-gray-300 p-2">{tournament.name}</td>
              <td className="border border-gray-300 p-2">{tournament.startDate}</td>
              <td className="border border-gray-300 p-2">{tournament.endDate}</td>
              <td className="border border-gray-300 p-2">{tournament.location}</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
