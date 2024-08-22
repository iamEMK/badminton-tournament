import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to BadmintonTourneys</h1>
      <p className="mb-8">Manage and track badminton tournaments with ease.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/tournaments" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition">
          View Tournaments
        </Link>
        <Link href="/players" className="bg-green-500 text-white p-4 rounded hover:bg-green-600 transition">
          View Players
        </Link>
        <Link href="/matches" className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600 transition">
          View Matches
        </Link>
        <Link href="/admin" className="bg-red-500 text-white p-4 rounded hover:bg-red-600 transition">
          Admin Panel
        </Link>
      </div>
    </div>
  )
}
