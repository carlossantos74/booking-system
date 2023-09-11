
import { createSlice } from "@reduxjs/toolkit";
import { MeetingState } from "./types";
import { 
  fetchMeetingList, 
  createMeeting, 
  deleteMeeting, 
  editMeeting, 
  assignMeetingRooms 
} from "./thunks";

const initialState: MeetingState = {
  meetingList: [],
  isLoading: true,
  hasError: false,
};

export const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    setMeetingList: (state, action) => {
      state.meetingList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMeetingList.pending, (state) => {
      state.isLoading = true
    });

    builder.addCase(fetchMeetingList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.meetingList = action.payload;
    });

    builder.addCase(fetchMeetingList.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    })

    builder.addCase(createMeeting.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createMeeting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.meetingList.push(action.payload);
    });

    builder.addCase(createMeeting.rejected, (state) => {
      state.isLoading = false;
    })

    builder.addCase(deleteMeeting.pending, (state) => {
      state.isLoading = true;
    })

    builder.addCase(deleteMeeting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.meetingList = state.meetingList.filter(meeting => meeting.id !== action.payload);
    })

    builder.addCase(deleteMeeting.rejected, (state) => {
      state.isLoading = false;
    })

    builder.addCase(editMeeting.pending, (state, action) => { 
      state.isLoading = true;
    })

    builder.addCase(editMeeting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.meetingList = state.meetingList.map(meeting => {
        if(meeting.id === action.payload.id) {
          return action.payload;
        }

        return meeting;
      })
    })

    builder.addCase(editMeeting.rejected, (state) => {
      state.isLoading = false;
    })

    builder.addCase(assignMeetingRooms.pending, (state) => {
      state.isLoading = true;
    })

    builder.addCase(assignMeetingRooms.rejected, (state) => {
      state.isLoading = false;
    })
  }
})