import { createSlice } from "@reduxjs/toolkit"

import platformData from "platformData"

const initialState = []
const newLink = { 
  ...Object.values(platformData)[0],
  url: "",
  altLabel: "",
}

export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addLink: (state) => {
      return [
        ...state,
        { ...newLink },
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