import { Recipe } from "src/recipes/entities/recipes.entity";

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [
  Recipe.collectionName,
];