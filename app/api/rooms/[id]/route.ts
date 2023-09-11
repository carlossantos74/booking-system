import { db } from "@/lib/prisma";
import { GetIdParams } from "@/utils/global.types";
import { Room } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: GetIdParams) {
  const { id } = params;

  try {
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
  } catch (error) {
    return NextResponse.json({
      statusText: 'Internal Server Error'
    }, { status: 500 });
  }
}