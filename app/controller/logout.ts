import { account } from '../auth/utils/appwrite_signup';

export const logOut = async () => {
  try {
    await account.deleteSession('current');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('isLogin');
  } catch (error) {
    console.error(error);
  }
};
