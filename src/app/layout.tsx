import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Badminton Tournament Management',
  description: 'Manage badminton tournaments, players, and matches',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              BadmintonTourneys
            </Link>
            <ul className="flex space-x-4">
              <li><Link href="/tournaments">Tournaments</Link></li>
              <li><Link href="/players">Players</Link></li>
              <li><Link href="/matches">Matches</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-200 p-4 mt-8">
          <div className="container mx-auto text-center">
            &copy; 2023 BadmintonTourneys. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
