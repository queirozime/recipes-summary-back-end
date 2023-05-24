import { Recipe } from "src/recipes/documents/recipes.document";
import { Shoplist } from "src/shoplists/documents/shoplist.document";

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [
  Recipe.collectionName,
  Shoplist.collectionName,
];