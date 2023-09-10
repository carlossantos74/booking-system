import { Meeting } from "@/app/api/meetings/types";

export interface MeetingState { 
  meetingList: Meeting[],
  isLoading: boolean
  hasError: boolean
}