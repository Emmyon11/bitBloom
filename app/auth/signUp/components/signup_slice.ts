import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { account, databases } from '../../utils/appwrite_signup';
import { ID, Models } from 'appwrite';
import { appwriteConstants } from '@/utils/appwrite';

interface SignUpDetail {
  email: string;
  password: string;
}

enum Investment_plan {
  none = 'none',
  basic = 'basic',
  standard = 'standard',
  premium = 'premium',
  gold = 'gold',
}

export const signUpUser = async (signUpDetail: SignUpDetail) => {
  try {
    const response = await account.create(
      ID.unique(),
      signUpDetail.email,
      signUpDetail.password
    );
    await account.createEmailSession(signUpDetail.email, signUpDetail.password);

    //save the user details to database
    const newUser: User = {
      name: response.email.split('@')[0],
      email: response.email,
      address: '',
      dob: '',
      profile_picture: '',
      investment_plan: Investment_plan.none,
      bitcoin_address: '',
      createdAt: response.$createdAt,
    };

    const user = await databases.createDocument(
      appwriteConstants.databaseId,
      appwriteConstants.user_profile_colectionId,
      response.$id,
      newUser
    );
    return user;
  } catch (error) {
    throw error;
  }

  //register the user
};
