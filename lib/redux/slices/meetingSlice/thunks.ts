import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { toast } from "react-toastify";
import { MeetingCreationBody, MeetingUpdateBody } from "@/app/api/meetings/types";
import { AssignRoomPayload } from "./types";
import { AssignRoom } from "@/app/api/meetings/assign-room/types";


export const fetchMeetingList = createAppAsyncThunk(
  'meeting/fetchMeetingList',
  async () => {
    const response = await fetch('/api/meetings');

    if(!response.ok) {
      toast.error('Error fetching meeting list');
      throw new Error('Error fetching meeting list');
    }

    return await response.json()
  }
);

export const createMeeting = createAppAsyncThunk(
  'meeting/createMeeting',
  async (params: MeetingCreationBody) => {
    const response = await fetch('/api/meetings', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok) { 
      throw new Error('Error creating meeting');
    }

    toast.success('Meeting created successfully');

    return await response.json()
  }
);

export const deleteMeeting = createAppAsyncThunk(
  'meeting/deleteMeeting',
  async (id: string) => {
    const response = await fetch(`/api/meetings`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok) { 
      throw new Error('Error deleting meeting');
    }

    toast.success('Meeting deleted successfully');

    return id;
  }
);

export const editMeeting = createAppAsyncThunk(
  'meeting/editMeeting',
  async (params: MeetingUpdateBody) => {
    const response = await fetch(`/api/meetings`, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok) {
      throw new Error('Error editing meeting');
    }

    toast.success('Meeting edited successfully');

    return await response.json()
  }
)

export const assignMeetingRooms = createAppAsyncThunk(
  'meeting/assignMeetingRooms',
  async (
      { meetingList, roomList }: AssignRoomPayload, 
      { dispatch }
    ) => {
    const meetingIdToRoomId: Record<string, string> = {}

    meetingList.forEach(meeting => {
      const dateRange = [meeting.timeToStart, meeting.timeToEnd];

      if(meeting.roomId) {
        meetingIdToRoomId[meeting.id] = meeting.roomId;
        return
      }

      const avaliableRooms = roomList.filter((room) => {
        return !meetingList.some((meeting) => {
          const meetingRange = [meeting.timeToStart, meeting.timeToEnd];

          return (
            meetingIdToRoomId[meeting.id] === room.id && 
            meetingRange[1] > dateRange[0] &&
            meetingRange[0] < dateRange[1] 
          )
        })
      })

      if(!avaliableRooms.length) return;

      meetingIdToRoomId[meeting.id] = avaliableRooms[0]?.id;
    })

    const meetingsToAssignRoom: AssignRoom[] = Object.entries(meetingIdToRoomId).map(([meetingId, roomId]) => ({
      meetingId,
      roomId
    }))

    const response = await fetch('/api/meetings/assign-room', {
      method: 'POST',
      body: JSON.stringify(meetingsToAssignRoom),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(!response.ok) {
      toast.error('Error assigning meeting rooms');
      throw new Error('Error assigning meeting rooms');
    }

    toast.success('Meeting rooms assigned successfully');

    dispatch(fetchMeetingList())
  }
)