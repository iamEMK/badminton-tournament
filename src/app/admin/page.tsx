import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/users" className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200">
          Manage Users
        </Link>
        <Link href="/admin/tournaments" className="p-4 bg-green-100 rounded-lg hover:bg-green-200">
          Manage Tournaments
        </Link>
        <Link href="/admin/players" className="p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200">
          Manage Players
        </Link>
      </div>
    </div>
  );
}
