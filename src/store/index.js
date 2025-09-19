import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import cartSlice from './slices/cartSlice'
import categoriesSlice from './slices/categoriesSlice'
import productsSlice from './slices/productsSlice'
import uiSlice from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    categories: categoriesSlice,
    products: productsSlice,
    ui: uiSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

// Export store types for use in components
export const getRootState = () => store.getState()
export const getAppDispatch = () => store.dispatch
