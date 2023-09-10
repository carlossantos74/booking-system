import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { toast } from "react-toastify";
import { MeetingCreationBody, MeetingUpdateBody } from "@/app/api/meetings/types";


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