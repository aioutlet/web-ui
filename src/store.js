import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import userSlice from './slices/userSlice'
import productSlice from './slices/productSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    products: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})