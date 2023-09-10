import { userSlice } from './slices'
import { roomSlice } from './slices/roomSlice'
import { meetingSlice } from './slices/meetingSlice'

export const reducer = {
  user: userSlice.reducer,
  room: roomSlice.reducer,
  meeting: meetingSlice.reducer
}
