import { FavoriteDocument } from "src/recipes/documents/favorites.document";
import { RecipeDocument } from "../recipes/documents/recipes.document";
import { ShoplistDocument } from "../shoplists/documents/shoplist.document";
import { UserDocument } from "../users/documents/users.document";

export const FirestoreDatabaseProvider = "firestoredb";
export const FirestoreOptionsProvider = "firestoreOptions";
export const FirestoreCollectionProviders: string[] = [
  UserDocument.collectionName,
  RecipeDocument.collectionName,
  ShoplistDocument.collectionName,
  FavoriteDocument.collectionName,
];
