import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calculateCartCount } from '../util/calculationsUtil'

export const counterSlice = createSlice({
  name: 'cartCount',
  initialState: {
    value: calculateCartCount(JSON.parse(localStorage.getItem("cart") || "[]"))
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload
    },
    zero: state => {
      state.value = 0
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, decrementByAmount, zero } = counterSlice.actions

export default counterSlice.reducer