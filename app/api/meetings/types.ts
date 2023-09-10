import type { User } from '@prisma/client'

export interface MeetingCreationBody {
  name: string,
  timeToStart: Date,
  timeToEnd: Date,
  users: string[],
}

export interface MeetingUpdateBody extends MeetingCreationBody {
  id: string,
}

export interface Meeting {
  id: string, 
  name: string,
  timeToStart: Date,
  timeToEnd: Date,
  roomId: string | null,
  users: User[],
}