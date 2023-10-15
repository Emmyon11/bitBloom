import { databases } from '@/app/auth/utils/appwrite_signup';
import { ProfileFormValues } from '../components/update_form';
import { appwriteConstants } from '@/utils/appwrite';

export const update_profile = async (
  id: string,
  updateData: ProfileFormValues
) => {
  try {
    await databases.updateDocument(
      appwriteConstants.databaseId,
      appwriteConstants.user_profile_colectionId,
      id,
      updateData
    );
  } catch (error) {
    throw `profile update not successful:${error}`;
  }
};
