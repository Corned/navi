import { configureStore } from "@reduxjs/toolkit"

import userSlice from "state/slice/userSlice"
import linksSlice from "state/slice/linksSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    links: linksSlice,
  }
})