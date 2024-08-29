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
    const tournament = await prisma.tournament.create({
      data: body,
    });
    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tournament' }, { status: 500 });
  }
}
