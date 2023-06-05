import { UserDocument } from "src/users/documents/users.document";
import { RecipeDocument } from "src/recipes/documents/recipes.document";
import { ShoplistDocument } from "src/shoplists/documents/shoplist.document";


export const FirestoreDatabaseProvider = "firestoredb";
export const FirestoreOptionsProvider = "firestoreOptions";
export const FirestoreCollectionProviders: string[] = [
  UserDocument.collectionName,
  RecipeDocument.collectionName,
  ShoplistDocument.collectionName,
];
