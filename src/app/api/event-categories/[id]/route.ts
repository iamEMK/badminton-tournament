import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        tournament: {
          select: {
            name: true,
            startDate: true,
            endDate: true,
            location: true,
            venue: true,
          },
        },
        matches: {
          include: {
            sets: true,
          },
        },
        entries: {
          include: {
            players: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                country: true,
              },
            },
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
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    // Validate EventType if provided
    if (body.name) {
      const validEventTypes = ['MENS_SINGLES', 'WOMENS_SINGLES', 'MENS_DOUBLES', 'WOMENS_DOUBLES', 'MIXED_DOUBLES'];
      if (!validEventTypes.includes(body.name)) {
        return NextResponse.json(
          { error: `Invalid event type. Must be one of: ${validEventTypes.join(', ')}` },
          { status: 400 }
        );
      }
    }

    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.tournamentId && { tournamentId: body.tournamentId }),
      },
      include: {
        tournament: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.event.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
