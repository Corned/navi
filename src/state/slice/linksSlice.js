import { createSlice } from "@reduxjs/toolkit"

const defaultService = "navi"
const defaultUrl = "https://navi.tmp.ooo/"

const initialState = []

export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addLink: (state) => {
      return [
        ...state,
        {
          index: state.length,
          service: defaultService,
          // url: defaultUrl,
        }
      ]
    },
    removeLink: (state) => {
      
    },
    updateLink: (state, action) => {
      return state.map((link) => {
        if (link.index !== action.payload.index) {
          return link
        }

        return { ...link, ...action.payload }
      })
    }
  }
})

export const { addLink, removeLink, updateLink } = linkSlice.actions
export default linkSlice.reducer