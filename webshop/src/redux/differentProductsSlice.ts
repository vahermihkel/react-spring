import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface DifferentProductsState {
  value: number
}

// Define the initial state using that type
const initialState: DifferentProductsState = {
  value: (JSON.parse(localStorage.getItem("cart") || "[]")).length
}

export const differentProductsSlice = createSlice({
  name: 'differentProducts',
  initialState,
  reducers: {
    incrementDifferentProducts: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrementDifferentProducts: state => {
      state.value -= 1
    },
    zero: state => {
      state.value = 0
    }
  }
})

// Action creators are generated for each case reducer function
export const { incrementDifferentProducts, decrementDifferentProducts, zero } = differentProductsSlice.actions

export default differentProductsSlice.reducer