import { account } from '../auth/utils/appwrite_signup';

export const logOut = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error(error);
  }
};
