import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

import platformData from "platformData"

const initialState = []
const newLink = { 
  platform: Object.values(platformData)[0].platform,
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
        {
          ...newLink,
          id: uuidv4(),
        },
      ]
    },
    removeLink: (state) => {
      
    },
    updateLink: (state, action) => {
      const newState = state.map((linkObject) => {
        if (linkObject.id !== action.payload.id) return linkObject

        return {
          ...linkObject ,
          ...action.payload,
        }
      })

      return newState
    }
  }
})

export const { addLink, removeLink, updateLink } = linkSlice.actions
export default linkSlice.reducer