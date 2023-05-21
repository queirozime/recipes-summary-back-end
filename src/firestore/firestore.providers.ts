import { RecipeDocument } from "src/recipes/documents/recipes.document";

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [
  RecipeDocument.collectionName,
];