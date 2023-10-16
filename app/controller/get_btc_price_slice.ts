// cryptoSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define a type for the data you'll fetch
export interface CryptoData {
  bitcoin: {
    usd: number;
  };
}

// Define a type for the slice state
interface CryptoState {
  data: CryptoData;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

// Create an async thunk for fetching data
export const fetchCryptoData = createAsyncThunk<CryptoData, void>(
  'crypto/fetchCryptoData',
  async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    const data: CryptoData = await response.json();
    return data;
  }
);

const initialState: CryptoState = {
  data: {
    bitcoin: { usd: 0 },
  },
  loading: 'idle',
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default cryptoSlice.reducer;
