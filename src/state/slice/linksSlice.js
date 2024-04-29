import { createSlice } from "@reduxjs/toolkit"

import platformData from "platformData"

const initialState = []

export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addLink: (state) => {
      return [
        ...state,
        { ...Object.values(platformData)[0] }
      ]
    },
    removeLink: (state) => {
      
    },
    updateLink: (state, action) => {

    }
  }
})

export const { addLink, removeLink, updateLink } = linkSlice.actions
export default linkSlice.reducer