import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('6522f7ced479c4fcb8e9');
// Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
