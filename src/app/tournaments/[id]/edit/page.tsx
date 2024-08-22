'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  category: string;
}

export default function EditTournamentPage() {
  const [tournament, setTournament] = useState<Tournament>({
    id: '', name: '', startDate: '', endDate: '', location: '', description: '', category: ''
  });
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Fetch tournament data here based on the id
    // For now, we'll use dummy data
    setTournament({
      id: id as string,
      name: 'Badminton World Championship',
      startDate: '2023-08-01',
      endDate: '2023-08-07',
      location: 'Tokyo, Japan',
      description: 'The premier badminton event of the year.',
      category: 'BWF World Tour Super 1000',
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTournament(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a PUT request to your API to update the tournament
    console.log('Updating tournament:', tournament);
    
    // Simulating an API call
    try {
      // Replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successfully updating the tournament, redirect to the tournament details page
      router.push(`/tournaments/${id}`);
    } catch (error) {
      console.error('Error updating tournament:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Tournament</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={tournament.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={tournament.startDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={tournament.endDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={tournament.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={tournament.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={tournament.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a category</option>
            <option value="BWF World Tour Super 1000">BWF World Tour Super 1000</option>
            <option value="BWF World Tour Super 750">BWF World Tour Super 750</option>
            <option value="BWF World Tour Super 500">BWF World Tour Super 500</option>
            <option value="BWF World Tour Super 300">BWF World Tour Super 300</option>
            <option value="BWF Tour Super 100">BWF Tour Super 100</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Tournament
          </button>
        </div>
      </form>
    </div>
  );
}
