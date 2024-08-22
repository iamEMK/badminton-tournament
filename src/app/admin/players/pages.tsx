'use client';

import { useState, useEffect } from 'react';

export default function AdminPlayers() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch players data here
    // setPlayers(fetchedPlayers);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Players</h1>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4">Add New Player</button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">First Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Country</th>
            <th className="border border-gray-300 p-2">Ranking</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player :any) => (
            <tr key={player.id}>
              <td className="border border-gray-300 p-2">{player.id}</td>
              <td className="border border-gray-300 p-2">{player.firstName}</td>
              <td className="border border-gray-300 p-2">{player.lastName}</td>
              <td className="border border-gray-300 p-2">{player.country}</td>
              <td className="border border-gray-300 p-2">{player.ranking}</td>
              <td className="border border-gray-300 p-2">{player.status}</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
              </tr>
              ))
            }
            </tbody>
            </table>
            </div>
  )}
