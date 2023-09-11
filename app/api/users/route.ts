import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { User } from '@prisma/client';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const users = await db.user.findMany();
  
    return NextResponse.json<User[]>(users)  
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
    const user = await db.user.create({
      data: {
        name
      }
    });

    return NextResponse.json<User>(user, { status: 201 });
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
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        name
      }
    });

    return NextResponse.json<User>(user, { status: 200 });
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
    await db.user.delete({
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