import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Query tournaments with proper relationship path: Tournament -> Event -> Match
    const tournaments = await prisma.tournament.findMany({
      include: {
        season: {
          select: {
            year: true,
          },
        },
        events: {
          include: {
            matches: {
              include: {
                sets: true,
              },
            },
            _count: {
              select: {
                entries: true,
              },
            },
          },
        },
      },
    });

    // Process the data to calculate statistics
    const processedStats = tournaments.map((tournament) => {
      // Flatten all matches from all events
      const allMatches = tournament.events.flatMap(event => event.matches);
      const completedMatches = allMatches.filter(match => match.status === 'COMPLETED');
      const inProgressMatches = allMatches.filter(match => match.status === 'IN_PROGRESS');
      const totalEntries = tournament.events.reduce((sum, event) => sum + event._count.entries, 0);

      return {
        id: tournament.id,
        name: tournament.name,
        location: tournament.location,
        startDate: tournament.startDate,
        endDate: tournament.endDate,
        category: tournament.category,
        seasonYear: tournament.season.year,
        totalEvents: tournament.events.length,
        totalMatches: allMatches.length,
        completedMatches: completedMatches.length,
        inProgressMatches: inProgressMatches.length,
        scheduledMatches: allMatches.length - completedMatches.length - inProgressMatches.length,
        totalEntries: totalEntries,
        completionRate: allMatches.length > 0
          ? ((completedMatches.length / allMatches.length) * 100).toFixed(2)
          : '0.00',
      };
    });

    return NextResponse.json(processedStats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tournament statistics' }, { status: 500 });
  }
}
