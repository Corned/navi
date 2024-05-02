import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

const initialState = {
  name: "",
  bio: "",
  picture: null,

}



export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    update: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    }
  }
})

export const { update } = profileSlice.actions
export default profileSlice.reducer