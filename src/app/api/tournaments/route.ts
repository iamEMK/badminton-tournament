import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tournaments = await prisma.tournament.findMany();
    return NextResponse.json(tournaments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tournaments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.startDate || !body.endDate || !body.location || !body.venue || !body.category || !body.totalPrizeMoney || !body.seasonId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, startDate, endDate, location, venue, category, totalPrizeMoney, seasonId' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = [
      'SUPER_1000', 'SUPER_750', 'SUPER_500', 'SUPER_300', 'SUPER_100',
      'WORLD_TOUR_FINALS', 'WORLD_CHAMPIONSHIPS', 'OLYMPIC_GAMES',
      'CONTINENTAL_CHAMPIONSHIPS', 'OTHER'
    ];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate dates
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    if (endDate < startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    const tournament = await prisma.tournament.create({
      data: {
        name: body.name,
        startDate: startDate,
        endDate: endDate,
        location: body.location,
        venue: body.venue,
        category: body.category,
        totalPrizeMoney: body.totalPrizeMoney,
        seasonId: body.seasonId,
      },
      include: {
        season: {
          select: {
            year: true,
          },
        },
      },
    });
    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tournament' }, { status: 500 });
  }
}
