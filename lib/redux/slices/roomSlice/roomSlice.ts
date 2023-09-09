
import { createSlice } from "@reduxjs/toolkit";
import { RoomState } from "./types";
import { fetchRoomList, createRoom, deleteRoom, editRoom } from "./thunks";

const initialState: RoomState = {
  roomList: [],
  isLoading: true,
  hasError: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomList: (state, action) => {
      state.roomList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomList.pending, (state) => {
      state.isLoading = true
    });

    builder.addCase(fetchRoomList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomList = action.payload;
    });

    builder.addCase(fetchRoomList.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    })

    builder.addCase(createRoom.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomList.push(action.payload);
    });

    builder.addCase(deleteRoom.pending, (state) => {
      state.isLoading = true;
    })

    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomList = state.roomList.filter(room => room.id !== action.payload);
    })

    builder.addCase(editRoom.pending, (state, action) => { 
      state.isLoading = true;
    })

    builder.addCase(editRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomList = state.roomList.map(room => {
        if(room.id === action.payload.id) {
          return action.payload;
        }

        return room;
      })
    })
  }
})