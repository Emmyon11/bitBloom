import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Models } from 'appwrite';
import { account, databases } from '../auth/utils/appwrite_signup';
import { appwriteConstants } from '@/utils/appwrite';
import { getWallet } from './wallet_slice';

const getUserFunction = async () => {
  try {
    const currentSession = await account.getSession('current');
    if (!currentSession) return;
    const user: Models.User<Models.Preferences> = await account.get();

    const userData: Models.Document = await databases.getDocument(
      appwriteConstants.databaseId,
      appwriteConstants.user_profile_colectionId,
      user.$id
    );
    if (!userData) return;
    const currentUser: User | null = {
      name: userData.name,
      email: userData.email,
      dob: userData.dob,
      address: userData.address,
      profile_picture: userData.profile_picture,
      investment_plan: userData.investment_plan,
      bitcoin_address: userData.bitcoin_address,
      createdAt: userData.createdAt,
    };
    sessionStorage.setItem('userData', JSON.stringify(currentUser));
    const walletData = await getWallet(user.$id);

    return { user, currentUser, walletData };
  } catch (error) {
    return;
  }
};

export const getUser = createAsyncThunk('getUser', async () => {
  //get current user
  return await getUserFunction();
});

type InitialState = {
  user: Models.User<Models.Preferences> | undefined | null;
  userData: User | null | undefined;
  isLoading: boolean;
  walletData: Wallet | undefined | null;
  error: String | undefined;
};

const initialState: InitialState = {
  user: undefined,
  userData: null,
  isLoading: false,
  walletData: undefined,
  error: '',
};

export const userSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearUser: (state) => {
      (state.user = null), (state.userData = null), (state.walletData = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action?.payload?.user;
      state.userData = action.payload?.currentUser;
      state.walletData = action.payload?.walletData;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
