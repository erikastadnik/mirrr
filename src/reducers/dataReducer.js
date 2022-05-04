import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    uploadData(state, action) {
      const data = action.payload
      
      return data
    }
  },
})




export const { uploadData } = dataSlice.actions

export default dataSlice.reducer