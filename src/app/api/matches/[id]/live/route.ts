import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const match = await prisma.match.findUnique({
      where: { id: params.id },
      include: {
        event: {
          include: {
            tournament: {
              select: {
                name: true,
                location: true,
                venue: true,
              },
            },
          },
        },
        sets: {
          orderBy: {
            setNumber: 'asc',
          },
          include: {
            rallies: {
              orderBy: {
                rallyNumber: 'asc',
              },
            },
          },
        },
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
    });

    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    // Calculate live score summary
    const liveScore = {
      match: {
        id: match.id,
        status: match.status,
        courtNumber: match.courtNumber,
        scheduledTime: match.scheduledTime,
        actualStartTime: match.actualStartTime,
        endTime: match.endTime,
        event: match.event,
      },
      sets: match.sets.map(set => ({
        setNumber: set.setNumber,
        team1Score: set.team1Score,
        team2Score: set.team2Score,
        duration: set.duration,
      })),
      players: match.playerStats.map(ps => ({
        player: ps.player,
        stats: {
          pointsScored: ps.pointsScored,
          smashes: ps.smashes,
          drops: ps.drops,
          netShots: ps.netShots,
          errors: ps.errors,
        },
      })),
      currentSet: match.sets.length > 0 ? match.sets[match.sets.length - 1] : null,
    };

    return NextResponse.json(liveScore);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch live score' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    // Update match status or other match properties
    const updatedMatch = await prisma.match.update({
      where: { id: params.id },
      data: {
        ...(body.status && { status: body.status }),
        ...(body.actualStartTime && { actualStartTime: new Date(body.actualStartTime) }),
        ...(body.endTime && { endTime: new Date(body.endTime) }),
        ...(body.winner && { winner: body.winner }),
        ...(body.courtNumber !== undefined && { courtNumber: body.courtNumber }),
      },
      include: {
        sets: {
          orderBy: {
            setNumber: 'asc',
          },
        },
        playerStats: {
          include: {
            player: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedMatch);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update match' }, { status: 500 });
  }
}

// POST method to add a new set or update scores
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    // Validate match exists
    const match = await prisma.match.findUnique({
      where: { id: params.id },
    });

    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    // If creating a new set
    if (body.type === 'set') {
      if (!body.setNumber || body.team1Score === undefined || body.team2Score === undefined) {
        return NextResponse.json(
          { error: 'Missing required fields for set: setNumber, team1Score, team2Score' },
          { status: 400 }
        );
      }

      const newSet = await prisma.set.create({
        data: {
          matchId: params.id,
          setNumber: body.setNumber,
          team1Score: body.team1Score,
          team2Score: body.team2Score,
          duration: body.duration,
        },
      });

      return NextResponse.json(newSet, { status: 201 });
    }

    // If creating a rally
    if (body.type === 'rally') {
      if (!body.setId || !body.rallyNumber || !body.servingPlayerId || !body.winningPlayerId || !body.returningPlayerId) {
        return NextResponse.json(
          { error: 'Missing required fields for rally' },
          { status: 400 }
        );
      }

      const newRally = await prisma.rally.create({
        data: {
          setId: body.setId,
          rallyNumber: body.rallyNumber,
          servingPlayerId: body.servingPlayerId,
          winningPlayerId: body.winningPlayerId,
          returningPlayerId: body.returningPlayerId,
          scoringShot: body.scoringShot,
          duration: body.duration,
        },
      });

      return NextResponse.json(newRally, { status: 201 });
    }

    return NextResponse.json({ error: 'Invalid type. Must be "set" or "rally"' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create live score entry' }, { status: 500 });
  }
}
