import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      include: {
        event: {
          include: {
            tournament: {
              select: {
                name: true,
                location: true,
              },
            },
          },
        },
        sets: true,
        playerStats: {
          include: {
            player: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                country: true,
              },
            },
          },
        },
      },
      orderBy: {
        scheduledTime: 'desc',
      },
    });
    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.eventId || !body.round || !body.scheduledTime) {
      return NextResponse.json(
        { error: 'Missing required fields: eventId, round, scheduledTime' },
        { status: 400 }
      );
    }

    // Validate round
    const validRounds = [
      'QUALIFICATION', 'ROUND_OF_64', 'ROUND_OF_32', 'ROUND_OF_16',
      'QUARTER_FINAL', 'SEMI_FINAL', 'FINAL'
    ];
    if (!validRounds.includes(body.round)) {
      return NextResponse.json(
        { error: `Invalid round. Must be one of: ${validRounds.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (body.status) {
      const validStatuses = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'WALKOVER', 'RETIRED', 'CANCELLED'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        );
      }
    }

    const match = await prisma.match.create({
      data: {
        eventId: body.eventId,
        round: body.round,
        scheduledTime: new Date(body.scheduledTime),
        courtNumber: body.courtNumber,
        status: body.status || 'SCHEDULED',
        umpire: body.umpire,
        serviceJudge: body.serviceJudge,
      },
      include: {
        event: {
          include: {
            tournament: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create match' }, { status: 500 });
  }
}
