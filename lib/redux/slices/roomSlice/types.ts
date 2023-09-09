import { Room } from "@prisma/client";

export interface RoomState { 
  roomList: Room[],
  isLoading: boolean
  hasError: boolean
}