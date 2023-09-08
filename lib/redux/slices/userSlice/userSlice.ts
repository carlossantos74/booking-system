
import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types";
import { fetchUserList, createUser, deleteUser, editUser } from "./thunks";

const initialState: UserState = {
  userList: [],
  isLoading: true,
  hasError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserList.pending, (state) => {
      state.isLoading = true
    });

    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userList = action.payload;
    });

    builder.addCase(fetchUserList.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    })

    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userList.push(action.payload);
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    })

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userList = state.userList.filter(user => user.id !== action.payload);
    })

    builder.addCase(editUser.pending, (state, action) => { 
      state.isLoading = true;
    })

    builder.addCase(editUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userList = state.userList.map(user => {
        if(user.id === action.payload.id) {
          return action.payload;
        }

        return user;
      })
    })
  }
})