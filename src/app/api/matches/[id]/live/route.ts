import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const liveScore = await prisma.liveScore.findUnique({
      where: { matchId: params.id },
      include: {
        match: {
          include: {
            singlesPlayers: true,
            doublesPairings: {
            //   include: {
            //     player1: true,
            //     player2: true,
            //   },
            },
          },
        },
      },
    });

    if (!liveScore) {
      return NextResponse.json({ error: 'Live score not found' }, { status: 404 });
    }

    return NextResponse.json(liveScore);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch live score' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updatedLiveScore = await prisma.liveScore.update({
      where: { matchId: params.id },
      data: body,
    });

    return NextResponse.json(updatedLiveScore);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update live score' }, { status: 500 });
  }
}

// You might want to add a POST method if you need to create a new live score entry

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const newLiveScore = await prisma.liveScore.create({
      data: {
        ...body,
        matchId: params.id,
      },
    });

    return NextResponse.json(newLiveScore, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create live score' }, { status: 500 });
  }
}
