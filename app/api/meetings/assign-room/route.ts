import { NextRequest, NextResponse } from "next/server";
import { AssignRoom } from "./types";
import { db } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const body = await request.text();

  if(!body) {
    return NextResponse.json({
      statusText: 'Bad Request - Missing body'
    }, 
    { status: 400 });
  }

  try {
    const meetings: AssignRoom[] = JSON.parse(body) as AssignRoom[];
    const meetingsToUpdate = meetings.filter(meeting => meeting.meetingId && meeting.roomId)

    if(!meetingsToUpdate.length) {
      return NextResponse.json({
        statusText: 'Bad Request - Missing meetingId or roomId'
      }, 
      { status: 400 });
    }

    for(let meeting of meetingsToUpdate) {
      await db.meeting.update({
        where: {
          id: meeting.meetingId
        },
        data: {
          room: {
            connect: {
              id: meeting.roomId
            }
          }
        }
      })
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}