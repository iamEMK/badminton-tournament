import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const playerStats = await prisma.playerStats.findMany({
      include: {
        player: true,
      },
    });
    return NextResponse.json(playerStats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch player statistics' }, { status: 500 });
  }
}

// You might want to add a POST method if you need to create or update player statistics
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const playerStats = await prisma.playerStats.create({
      data: body,
    });
    return NextResponse.json(playerStats, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create player statistics' }, { status: 500 });
  }
}
