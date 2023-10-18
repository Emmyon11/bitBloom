import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { account } from '../../utils/appwrite_signup';
import { Models } from 'appwrite';

interface LoginDetail {
  email: string;
  password: string;
}

export const loginUser = async (loginDetail: LoginDetail) => {
  //register the user
  try {
    const session = await account.createEmailSession(
      loginDetail.email,
      loginDetail.password
    );
    sessionStorage.setItem('isLogin', 'true');
    return session;
  } catch (error) {
    throw error;
  }
};
