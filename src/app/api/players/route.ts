import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      include: {
        statistics: {
          select: {
            currentWorldRanking: true,
            highestWorldRanking: true,
            matchesPlayed: true,
            matchesWon: true,
          },
        },
      },
      orderBy: {
        lastName: 'asc',
      },
    });
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.bwfId || !body.firstName || !body.lastName || !body.dateOfBirth || !body.country || !body.gender) {
      return NextResponse.json(
        { error: 'Missing required fields: bwfId, firstName, lastName, dateOfBirth, country, gender' },
        { status: 400 }
      );
    }

    // Validate gender
    const validGenders = ['MALE', 'FEMALE', 'OTHER'];
    if (!validGenders.includes(body.gender)) {
      return NextResponse.json(
        { error: `Invalid gender. Must be one of: ${validGenders.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate handedness if provided
    if (body.handedness) {
      const validHandedness = ['RIGHT', 'LEFT'];
      if (!validHandedness.includes(body.handedness)) {
        return NextResponse.json(
          { error: `Invalid handedness. Must be one of: ${validHandedness.join(', ')}` },
          { status: 400 }
        );
      }
    }

    const player = await prisma.player.create({
      data: {
        bwfId: body.bwfId,
        firstName: body.firstName,
        lastName: body.lastName,
        dateOfBirth: new Date(body.dateOfBirth),
        country: body.country,
        gender: body.gender,
        handedness: body.handedness || 'RIGHT',
        height: body.height,
        playingStatus: body.playingStatus || 'ACTIVE',
      },
    });
    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create player' }, { status: 500 });
  }
}
