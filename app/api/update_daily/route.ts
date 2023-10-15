import { databases } from '@/app/auth/utils/appwrite_signup';
import { appwriteConstants } from '@/utils/appwrite';
import { Models } from 'appwrite';
import { updateWallet } from './utils';

export type CusWallet = {
  id: string;
  user_email: string;
  current_balance: number;
  investment_plan: Investment_plan;
  investment_date: string;
  initial_investment: number;
  btc_address: string;
  status: Status;
};
export async function GET() {
  try {
    const respons = await databases.listDocuments(
      appwriteConstants.databaseId,
      appwriteConstants.wallet_collectionId
    );
    let List = respons.documents;

    if (respons.total <= 0) return;
    const walletList = List.map((user) => {
      const wallet: CusWallet = {
        id: user.$id,
        btc_address: user.btc_address,
        current_balance: user.current_balance,
        investment_date: user.investment_date,
        investment_plan: user.investment_plan,
        initial_investment: user.initial_investment,
        user_email: user.user_email,
        status: user.status,
      };
      return wallet;
    });
    const filteredWallet = walletList.filter(
      (wallet) =>
        wallet.investment_plan !== 'none' && wallet.status == 'accepted'
    );
    if (filteredWallet.length === 0)
      return Response.json({ msg: 'list is empty' });
    filteredWallet.forEach(async (wallet) => {
      await updateWallet(wallet);
    });
    return Response.json({ msg: 'wallet updated' });
  } catch (error) {
    console.log(error);
    return Response.json({ msg: 'something went wrong' });
  }
}
