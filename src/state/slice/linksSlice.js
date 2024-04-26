import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addLink: (state) => {
    },
    removeLink: (state) => {
      
    }
  }
})

export const { addLink, removeLink } = linkSlice.actions
export default linkSlice.reducer