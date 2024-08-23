import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const eventCategory = await prisma.eventCategory.findUnique({
      where: { id: params.id },
    });
    if (!eventCategory) {
      return NextResponse.json({ error: 'Event category not found' }, { status: 404 });
    }
    return NextResponse.json(eventCategory);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch event category' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const eventCategory = await prisma.eventCategory.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(eventCategory);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event category' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.eventCategory.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Event category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event category' }, { status: 500 });
  }
}
