'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Tournament {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  category: string;
}

export default function CreateTournamentPage() {
  const [tournament, setTournament] = useState<Tournament>({
    name: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    category: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTournament(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a POST request to your API to create the tournament
    console.log('Creating tournament:', tournament);
    
    // Simulating an API call
    try {
      // Replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successfully creating the tournament, redirect to the tournaments list
      router.push('/tournaments');
    } catch (error) {
      console.error('Error creating tournament:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Tournament</h1>
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
            <option value="BWF_WORLD_TOUR_SUPER_1000">BWF World Tour Super 1000</option>
            <option value="BWF_WORLD_TOUR_SUPER_750">BWF World Tour Super 750</option>
            <option value="BWF_WORLD_TOUR_SUPER_500">BWF World Tour Super 500</option>
            <option value="BWF_WORLD_TOUR_SUPER_300">BWF World Tour Super 300</option>
            <option value="BWF_TOUR_SUPER_100">BWF Tour Super 100</option>
            <option value="OLYMPIC_GAMES">Olympic Games</option>
            <option value="BWF_WORLD_CHAMPIONSHIPS">BWF World Championships</option>
            <option value="CONTINENTAL_CHAMPIONSHIPS">Continental Championships</option>
            <option value="NATIONAL_CHAMPIONSHIPS">National Championships</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Tournament
          </button>
        </div>
      </form>
    </div>
  );
}
