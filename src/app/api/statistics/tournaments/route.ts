import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // This is a more complex query that aggregates data from multiple tables
    const tournamentStats = await prisma.tournament.findMany({
      include: {
        matches: {
          include: {
            singlesPlayers: true,
            doublesPairings: true,
            sets: true,
          },
        },
      },
    });

    // Process the data to calculate statistics
    const processedStats = tournamentStats.map((tournament:any) => ({
      id: tournament.id,
      name: tournament.name,
      totalMatches: tournament.matches.length,
      completedMatches: tournament.matches.filter((match:any) => match.status === 'COMPLETED').length,
      // Add more statistics as needed
    }));

    return NextResponse.json(processedStats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tournament statistics' }, { status: 500 });
  }
}
