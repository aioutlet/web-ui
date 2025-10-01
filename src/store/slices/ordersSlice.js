import { createSlice } from '@reduxjs/toolkit';
import { orders as mockOrders } from '../../data/orders';

// Initial state for orders
const initialState = {
  orders: mockOrders, // In future, this will be populated from API
  loading: false,
  error: null,
};

// Redux slice for orders state management
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Action to set orders data
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Action to set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Action to clear error
    clearError: state => {
      state.error = null;
    },
  },
  // Future: Add extraReducers for async thunks
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchOrders.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchOrders.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.orders = action.payload;
  //     })
  //     .addCase(fetchOrders.failure, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
});

// Export actions
export const { setOrders, setLoading, setError, clearError } =
  ordersSlice.actions;

// Selectors - functions to access state
export const selectAllOrders = state => state.orders.orders;
export const selectOrdersLoading = state => state.orders.loading;
export const selectOrdersError = state => state.orders.error;

// Memoized selectors for derived state (using createSelector if needed)
export const selectOrdersCount = state => state.orders.orders.length;

// Future: Add async thunks for API calls
// export const fetchOrders = createAsyncThunk(
//   'orders/fetchOrders',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await ordersAPI.getOrders();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export default ordersSlice.reducer;
