import { databases } from '@/app/auth/utils/appwrite_signup';
import { appwriteConstants, storage } from '@/utils/appwrite';
import { ID, Models } from 'appwrite';

export const update_profile_image = async (id: string, image: File) => {
  try {
    const imgList = await storage.listFiles(
      appwriteConstants.profile_img_bucketId
    );
    const filteredList = imgList.files.filter((img) => img.$id.includes(id));
    if (filteredList.length > 0) {
      await storage.deleteFile(
        appwriteConstants.profile_img_bucketId,
        filteredList[0].$id
      );

      const res = await storage.createFile(
        appwriteConstants.profile_img_bucketId,
        `${id}_${ID.unique().slice(7)}`,
        image
      );
      const imageUrl = `${appwriteConstants.ENDPOINT}/storage/buckets/${appwriteConstants.profile_img_bucketId}/files/${res.$id}/view?project=${appwriteConstants.projectId}&mode=admin`;
      const data = {
        profile_picture: imageUrl,
      };
      await databases.updateDocument(
        appwriteConstants.databaseId,
        appwriteConstants.user_profile_colectionId,
        id,
        data
      );
    } else {
      const res = await storage.createFile(
        appwriteConstants.profile_img_bucketId,
        `${id}_profileImg`,
        image
      );
      const imageUrl = `${appwriteConstants.ENDPOINT}/storage/buckets/${appwriteConstants.profile_img_bucketId}/files/${res.$id}/view?project=${appwriteConstants.projectId}&mode=admin`;
      const data = {
        profile_picture: imageUrl,
      };
      await databases.updateDocument(
        appwriteConstants.databaseId,
        appwriteConstants.user_profile_colectionId,
        id,
        data
      );
    }
  } catch (error) {
    throw `profile image update not successful:${error}`;
  }
};
