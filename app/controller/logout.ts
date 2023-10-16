import { account } from '../auth/utils/appwrite_signup';

export const logOut = async () => {
  try {
    await account.deleteSession('current');
    sessionStorage.removeItem('userData');
  } catch (error) {
    console.error(error);
  }
};
