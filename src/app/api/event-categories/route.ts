import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        tournament: {
          select: {
            name: true,
            startDate: true,
            endDate: true,
          },
        },
        _count: {
          select: {
            matches: true,
            entries: true,
          },
        },
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.tournamentId) {
      return NextResponse.json(
        { error: 'Missing required fields: name and tournamentId' },
        { status: 400 }
      );
    }

    // Validate EventType
    const validEventTypes = ['MENS_SINGLES', 'WOMENS_SINGLES', 'MENS_DOUBLES', 'WOMENS_DOUBLES', 'MIXED_DOUBLES'];
    if (!validEventTypes.includes(body.name)) {
      return NextResponse.json(
        { error: `Invalid event type. Must be one of: ${validEventTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        name: body.name,
        tournamentId: body.tournamentId,
      },
      include: {
        tournament: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
