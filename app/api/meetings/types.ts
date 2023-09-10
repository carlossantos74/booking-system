import type { User } from '@prisma/client'

export interface MeetingCreationBody {
  name: string,
  time: Date,
  users: string[],
}

export interface MeetingUpdateBody extends MeetingCreationBody {
  id: string,
}

export interface Meeting {
  id: string, 
  name: string,
  time: Date,
  roomId: string | null,
  users: User[],
}