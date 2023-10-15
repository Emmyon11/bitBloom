import { Models } from 'appwrite';
import { databases } from '../auth/utils/appwrite_signup';
import { appwriteConstants } from '@/utils/appwrite';

export const getWallet = async (id: string) => {
  try {
    const response: Models.Document = await databases.getDocument(
      appwriteConstants.databaseId,
      appwriteConstants.wallet_collectionId,
      id
    );
    if (response == null || response.$id == null) return;
    const walletData: Wallet = {
      btc_address: response.btc_address,
      current_balance: response.current_balance,
      initial_investment: response.initial_investment,
      investment_date: response.investment_date,
      investment_plan: response.investment_plan,
      user_email: response.user_email,
      status: response.status,
    };

    return walletData;
  } catch (error) {
    return;
  }
};
