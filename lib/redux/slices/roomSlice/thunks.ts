import { Room } from "@prisma/client";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { toast } from "react-toastify";


export const fetchRoomList = createAppAsyncThunk(
  'room/fetchRoomList',
  async () => {
    const response = await fetch('/api/rooms');

    if(!response.ok) {
      toast.error('Error fetching room list');
      throw new Error('Error fetching room list');
    }

    return await response.json()
  }
);

export const createRoom = createAppAsyncThunk(
  'room/createRoom',
  async (name: string) => {
    const response = await fetch('/api/rooms', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok) { 
      throw new Error('Error creating room');
    }

    toast.success('Room created successfully');

    return await response.json()
  }
);

export const deleteRoom = createAppAsyncThunk(
  'room/deleteRoom',
  async (id: string) => {
    const response = await fetch(`/api/rooms/`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok) { 
      throw new Error('Error deleting room');
    }

    toast.success('Room deleted successfully');

    return id;
  }
);

export const editRoom = createAppAsyncThunk(
  'room/editRoom',
  async ({ id, name }: Partial<Room>) => {
    const response = await fetch(`/api/rooms`, {
      method: 'PUT',
      body: JSON.stringify({ id, name }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok) {
      throw new Error('Error editing room');
    }

    toast.success('Room edited successfully');

    return await response.json()
  }
)