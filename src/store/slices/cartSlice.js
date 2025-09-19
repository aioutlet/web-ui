import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existingItem = state.items.find(i => i.id === item.id)

      if (existingItem) {
        existingItem.quantity += item.quantity || 1
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 })
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      )
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload
      state.items = state.items.filter(item => item.id !== itemId)
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      )
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)

      if (item && quantity > 0) {
        item.quantity = quantity
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      )
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    },
    clearCart: state => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },
    toggleCart: state => {
      state.isOpen = !state.isOpen
    },
    closeCart: state => {
      state.isOpen = false
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  closeCart,
} = cartSlice.actions

export default cartSlice.reducer
