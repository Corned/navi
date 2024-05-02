import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  name: "",
  bio: "",
  picture: null,
}

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    }
  }
})

export const { updateProfile } = profileSlice.actions
export default profileSlice.reducer