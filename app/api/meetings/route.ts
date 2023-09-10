import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { MeetingCreationBody, MeetingUpdateBody, Meeting} from "./types"


export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  try {
    if(id) { 
      const meeting = await db.meeting.findUnique({
        where: {
          id,
        },
        include: {
          meetingUsers: true,
        }
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

      return NextResponse.json<Meeting>({
        id: meeting.id,
        name: meeting.name,
        roomId: meeting.roomId,
        timeToStart: meeting.timeToStart,
        timeToEnd: meeting.timeToEnd,
        users,
      });
    }
  
    const meetings = await db.meeting.findMany({
      include: {
        meetingUsers: true,
      }
    });

    const users = await db.user.findMany({
      where: {
        id: {
          in: meetings.map((meeting) => meeting.meetingUsers.map((meetingUser) => meetingUser.userId)).flat()
        }
      }
    });
  
    return NextResponse.json<Meeting[]>(meetings.map(meeting => ({
      id: meeting.id,
      name: meeting.name,
      roomId: meeting.roomId,
      timeToStart: meeting.timeToStart,
      timeToEnd: meeting.timeToEnd,
      users: users.filter((user) => meeting.meetingUsers.find((meetingUser) => meetingUser.userId === user.id)),
    })));
  } catch (error) {
    return NextResponse.json({
      statusText: 'Internal Server Error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();

  if(!body) {
    return NextResponse.json({
      statusText: 'Bad Request - Missing body'
    }, 
    { status: 400 });
  }

  try {
    const { name, timeToStart, timeToEnd, users }: MeetingCreationBody = JSON.parse(body); 

    if(!name || !timeToStart || !timeToEnd || !users) {
      return NextResponse.json({
        statusText: 'Bad Request - Missing fields'
      }, 
      { status: 400 });
    }

    const meeting = await db.meeting.create({
      data: {
        name,
        timeToStart,
        timeToEnd,
        meetingUsers: {
          create: users.map((id) => ({ userId: id }))
        }
      },
      include: {
        meetingUsers: true,
      }
    });

    const usersInToMeeting = await db.user.findMany({
      where: {
        id: {
          in: meeting.meetingUsers.map((meetingUser) => meetingUser.userId)
        }
      }
    })

    return NextResponse.json<Meeting>({
      id: meeting.id,
      name: meeting.name,
      timeToStart: meeting.timeToStart,
      timeToEnd: meeting.timeToEnd,
      roomId: meeting.roomId,
      users: usersInToMeeting,
    }, 
    { 
      status: 201 
    });
  } catch (error) {
    return NextResponse.json({ }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.text();

  if(!body) { 
    return NextResponse.json({
      statusText: 'Bad Request - Missing body'
    }, 
    { status: 400 });
  }

  try {
    const { id, name, timeToStart, timeToEnd, users }: MeetingUpdateBody = JSON.parse(body);

    if(!id || !name || !timeToStart || !timeToEnd || !users) {
      return NextResponse.json({
        statusText: 'Bad Request - Missing fields'
      }, 
      { status: 400 });
    }

    const meetingUsers = await db.meetingUser.findMany({
      where: { meetingId: id }
    })

    const usersToDelete = meetingUsers.filter((meetingUser) => !users.includes(meetingUser.userId));
    const usersToCreate = users.filter((userId) => !meetingUsers.find((meetingUser) => meetingUser.userId === userId));

    if(usersToDelete.length) { 
      await db.meetingUser.deleteMany({
        where: { id: { in: usersToDelete.map((meetingUser) => meetingUser.id) } }
      })
    }

    if(usersToCreate.length) {
      await db.meetingUser.createMany({
        data: usersToCreate.map((userId) => ({ userId, meetingId: id }))
      })
    }

    const meeting = await db.meeting.update({
      where: { id },
      data: {
        name,
        timeToStart,
        timeToEnd,
      },
      include: {
        meetingUsers: true,
      }
    });

    const usersInToMeeting = await db.user.findMany({
      where: {
        id: {
          in: meeting.meetingUsers.map((meetingUser) => meetingUser.userId)
        }
      }
    })

    return NextResponse.json<Meeting>({
      id: meeting.id,
      name: meeting.name,
      timeToStart: meeting.timeToStart,
      timeToEnd: meeting.timeToEnd,
      roomId: meeting.roomId,
      users: usersInToMeeting,
    });
  } catch (error) {
    return NextResponse.json({ }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.text();

  if(!body) { 
    return NextResponse.json({
      statusText: 'Bad Request - Missing body'
    }, 
    { status: 400 });
  }

  try {
    const { id } = JSON.parse(body);

    if(!id) {
      return NextResponse.json({
        statusText: 'Bad Request - Missing fields'
      }, 
      { status: 400 });
    }

    await db.meetingUser.deleteMany({
      where: { meetingId: id }
    })

    await db.meeting.delete({ where: { id } });

    return NextResponse.json({});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ }, { status: 500 });
  }
}