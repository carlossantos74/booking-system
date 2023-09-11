import { Meeting } from "@/app/api/meetings/types";
import { Room } from "@prisma/client";

export interface MeetingState { 
  meetingList: Meeting[],
  isLoading: boolean
  hasError: boolean
}

export interface AssignRoomPayload {
  meetingList: Meeting[]
  roomList: Room[]
}