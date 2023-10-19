import { account } from '../auth/utils/appwrite_signup';

export const logOut = async () => {
  try {
    await account.deleteSession('current');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLogin');
  } catch (error) {
    console.error(error);
  }
};
