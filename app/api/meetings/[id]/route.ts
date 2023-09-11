import { NextRequest, NextResponse } from "next/server";
import { Meeting } from "../types";
import { db } from "@/lib/prisma";
import { GetIdParams } from "@/utils/global.types";


export async  function GET(request: NextRequest, { params }: GetIdParams) { 
  const { id } = params;

  if(!id) {
    return NextResponse.json({
      statusText: 'Bad Request - Missing id'
    }, 
    { status: 400 });
  }

  try {
    const meeting = await db.meeting.findUnique({
      where: {
        id,
      },
      include: {
        meetingUsers: true,
      },
    });
  
    if(!meeting) {
      return NextResponse.json({
        statusText: 'Not Found'
      }, 
      { status: 404 });
    }
  
  
    const users = await db.user.findMany({
      where: {
        id: { 
          in: meeting.meetingUsers.map((meetingUser) => meetingUser.userId)
        }
      }
    })
  
    let room = null;
  
    if(meeting.roomId) { 
      room = await db.room.findUnique({
        where: {
          id: meeting.roomId,
        }
      })
    }  
  
    return NextResponse.json<Meeting>({
      id: meeting.id,
      name: meeting.name,
      roomId: meeting.roomId,
      room,
      timeToStart: meeting.timeToStart,
      timeToEnd: meeting.timeToEnd,
      users,
    }); 
  } catch (error) {
    return NextResponse.json({
      statusText: 'Internal Server Error'
    }, { status: 500 });
  }
}