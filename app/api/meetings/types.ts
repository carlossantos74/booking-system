import type { User } from '@prisma/client'

export interface MeetingCreationBody {
  name: string,
  timeToStart: string,
  timeToEnd: string,
  users: string[],
}

export interface MeetingUpdateBody extends MeetingCreationBody {
  id: string,
}

export interface Meeting {
  id: string, 
  name: string,
  timeToStart: string,
  timeToEnd: string,
  roomId: string | null,
  users: User[],
}