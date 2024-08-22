import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: params.id },
    });
    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }
    return NextResponse.json(tournament);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tournament' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const tournament = await prisma.tournament.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(tournament);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tournament' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.tournament.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Tournament deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete tournament' }, { status: 500 });
  }
}
