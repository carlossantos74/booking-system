import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { Room } from '@prisma/client';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  try {
    if(id) { 
      const room = await db.room.findUnique({
        where: {
          id,
        }
      });
  
      if(!room) {
        return NextResponse.json({
          statusText: 'Not Found'
        }, 
        { status: 404 });
      }
  
      return NextResponse.json<Room>(room);
    }
  
    const rooms = await db.room.findMany({
      orderBy: {
        'createdAt': 'desc'
      }
    });
  
    return NextResponse.json<Room[]>(rooms)  
  } catch (error) {
    return NextResponse.json({
      statusText: 'Internal Server Error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();

  if(!body) {
    return NextResponse.json({
      statusText: 'Bad Request - Missing body'
    }, 
    { status: 400 });
  };

  const { name } = JSON.parse(body);

  if(!name) {
    return NextResponse.json({
      statusText: 'Bad Request - Missing name'
    }, 
    { status: 400 });
  }

  try {
    const room = await db.room.create({
      data: {
        name
      }
    });

    return NextResponse.json<Room>(room, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      statusText: 'Internal Server Error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();

  if(!body) {
    return NextResponse.json({
      statusText: 'Bad Request - Missing body'
    }, 
    { 
      status: 400 
    });
  };

  const { name, id } = JSON.parse(body);

  if(!name || !id) {
    return NextResponse.json({
      statusText: 'Bad Request - Missing fields'
    }, 
    { 
      status: 400 
    });
  }

  try {
    const room = await db.room.update({
      where: {
        id,
      },
      data: {
        name
      }
    });

    return NextResponse.json<Room>(room, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      statusText: 'Internal Server Error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();

  if(!body) {
    return NextResponse.json({
      statusText: 'Bad Request - Missing body'
    }, 
    { status: 400 });
  };

  const { id } = JSON.parse(body);

  if(!id) {
    return NextResponse.json({
      statusText: 'Bad Request - Missing id'
    }, 
    { status: 400 });
  }

  try {
    await db.room.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      statusText: 'Internal Server Error'
    }, { status: 500 });
  }
}