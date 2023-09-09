import { userSlice } from './slices'
import { roomSlice } from './slices/roomSlice'

export const reducer = {
  user: userSlice.reducer,
  room: roomSlice.reducer,
}
