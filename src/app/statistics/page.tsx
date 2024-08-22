import Link from 'next/link';

export default function StatisticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/statistics/players" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center">
          Player Statistics
        </Link>
        <Link href="/statistics/tournaments" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-center">
          Tournament Statistics
        </Link>
      </div>
    </div>
  );
}
