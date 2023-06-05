import { UserDocument } from "src/users/documents/users.document";

export const FirestoreDatabaseProvider = "firestoredb";
export const FirestoreOptionsProvider = "firestoreOptions";
export const FirestoreCollectionProviders: string[] = [
  UserDocument.collectionName,
];
