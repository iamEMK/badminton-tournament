import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const eventCategories = await prisma.eventCategory.findMany();
    return NextResponse.json(eventCategories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch event categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const eventCategory = await prisma.eventCategory.create({
      data: body,
    });
    return NextResponse.json(eventCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event category' }, { status: 500 });
  }
}
