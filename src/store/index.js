import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    orders: ordersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
