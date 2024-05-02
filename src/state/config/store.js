import { configureStore } from "@reduxjs/toolkit"

import userSlice from "state/slice/userSlice"
import linksSlice from "state/slice/linksSlice"
import profileSlice from "state/slice/profileSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    links: linksSlice,
    profile: profileSlice,
  }
})