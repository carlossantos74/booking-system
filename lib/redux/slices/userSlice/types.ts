import { User } from "@prisma/client";

export interface UserState { 
  userList: User[],
  isLoading: boolean
  hasError: boolean
}