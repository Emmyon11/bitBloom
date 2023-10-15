import { Client, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6522f7ced479c4fcb8e9');

export const storage = new Storage(client);

export const appwriteConstants = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT!,
  databaseId: process.env.NEXT_PUBLIC_DATABASE_ID!,
  user_profile_colectionId: process.env.NEXT_PUBLIC_USER_PROFILE_COLLECTION_ID!,
  wallet_collectionId: process.env.NEXT_PUBLIC_WALLET_COLLECTION_ID!,
  payment_bucketId: process.env.NEXT_PUBLIC_PAYMENT_BUCKET_ID!,
  profile_img_bucketId: process.env.NEXT_PUBLIC_PROFILE_IMG_BUCKET_ID!,
};
