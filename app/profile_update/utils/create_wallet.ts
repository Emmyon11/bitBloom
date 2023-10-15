import { databases } from '@/app/auth/utils/appwrite_signup';
import { ProfileFormValues } from '../components/update_form';
import { appwriteConstants, storage } from '@/utils/appwrite';
import { ID, Models } from 'appwrite';

export const create_wallet = async (
  id: string,
  data: Wallet,
  image: File,
  plan: Investment_plan
) => {
  try {
    await storage.createFile(
      appwriteConstants.payment_bucketId,
      ID.unique(),
      image
    );

    const documentList = await databases.listDocuments(
      appwriteConstants.databaseId,
      appwriteConstants.wallet_collectionId
    );
    const filteredList = documentList.documents.filter((document) =>
      document.$id.includes(id)
    );
    if (filteredList.length > 0) {
      await databases.deleteDocument(
        appwriteConstants.databaseId,
        appwriteConstants.wallet_collectionId,
        filteredList[0].$id
      );
      await databases.createDocument(
        appwriteConstants.databaseId,
        appwriteConstants.wallet_collectionId,
        id,
        data
      );
      await databases.updateDocument(
        appwriteConstants.databaseId,
        appwriteConstants.user_profile_colectionId,
        id,
        { investment_plan: plan }
      );
    } else {
      await databases.createDocument(
        appwriteConstants.databaseId,
        appwriteConstants.wallet_collectionId,
        id,
        data
      );
    }
  } catch (error) {
    throw `profile update not successful:${error}`;
  }
};
