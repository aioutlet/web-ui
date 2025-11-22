import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ordersAPI from '../../api/ordersAPI';

// Initial state for orders
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Async thunk to fetch orders from API
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching orders from API...');
      const response = await ordersAPI.getMyOrders();
      console.log('✅ Orders fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('❌ Failed to fetch orders:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

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
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
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

export default ordersSlice.reducer;
