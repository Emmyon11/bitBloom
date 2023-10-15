import { databases } from '@/app/auth/utils/appwrite_signup';
import { CusWallet } from './route';
import { appwriteConstants } from '@/utils/appwrite';

enum Investment_plan {
  none = 'none',
  basic = 'basic',
  standard = 'standard',
  premium = 'premium',
  gold = 'gold',
}

export const updateWallet = async (wallet: CusWallet) => {
  try {
    const current_balance = getIncreament(wallet);
    await databases.updateDocument(
      appwriteConstants.databaseId,
      appwriteConstants.wallet_collectionId,
      wallet.id,
      { current_balance: current_balance }
    );
  } catch (error) {
    console.log('Error in updating the balance');
    return;
  }
};

const getIncreament = (wallet: CusWallet) => {
  switch (wallet.investment_plan) {
    case Investment_plan.basic:
      return wallet.current_balance * (3.5 / 100);

    case Investment_plan.standard:
      return wallet.current_balance * (5 / 100);

    case Investment_plan.premium:
      return wallet.current_balance * (7 / 100);
    case Investment_plan.gold:
      return wallet.current_balance * 0.1;

    default:
      return wallet.current_balance;
  }
};
