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
          url: defaultUrl,
        }
      ]
    },
    removeLink: (state) => {
      
    },
    updateLink: (state) => {

    }
  }
})

export const { addLink, removeLink } = linkSlice.actions
export default linkSlice.reducer