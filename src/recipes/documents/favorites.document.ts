import { Inject, Injectable, Scope } from "@nestjs/common";
import { Recipe } from "../entities/recipe.entity";
import { CollectionReference, DocumentData, QueryDocumentSnapshot, Firestore } from "@google-cloud/firestore";
import { FavoriteRecipeDto } from "../dto/favorite-recipe.dto";
import { AccessTokenDto } from "../dto/access-token.dto";
import * as admin from  'firebase-admin'

@Injectable({scope: Scope.REQUEST})
export class FavoriteDocument {
  static collectionName = 'FavoriteRecipes';
  
  private favoriteConverter = { // Conversor de objetos Firebase
    toFirestore(favorite: FavoriteRecipeDto): DocumentData {
      return {  
        title: favorite.title,
        basePortion: favorite.basePortion,
        imageUrl: favorite.imageUrl,
        preparationTime: favorite.preparationTime,
        recipeId: favorite.recipeId,
        userId: favorite.userId
      }
    },
    //TODO: Alterar método fromFirestore para retornar Recipe[]
    fromFirestore(snapshot: QueryDocumentSnapshot): FavoriteRecipeDto {
      const data = snapshot.data();
      return new FavoriteRecipeDto(
        data.title, 
        data.basePortion, 
        data.preparationTime, 
        data.imageUrl, 
        data.recipeId, 
        data.userId
      );
    }
  };

  constructor(
    @Inject(FavoriteDocument.collectionName)
    private favoriteCollection: CollectionReference<FavoriteDocument>
  ) {}

  async favorite(recipe: Recipe, accessToken: string): Promise<FavoriteRecipeDto> {
    let userId = (await admin.auth().verifyIdToken(accessToken)).uid
    const favorite = new FavoriteRecipeDto(
      recipe.getTitle(),
      recipe.getBasePortion(),
      recipe.getPreparationTime(),
      recipe.getImageUrl(),
      recipe.getId(),
      userId
      )
    const snapshot = await this.favoriteCollection.withConverter(this.favoriteConverter).add(favorite);
    return favorite;
  }

  async findFavorites(accessToken: string): Promise<FavoriteRecipeDto[]> {
    const userId = (await admin.auth().verifyIdToken(accessToken)).uid
    const snapshot = await this.favoriteCollection.withConverter(this.favoriteConverter).where('userId', '==', userId).get();
    const favorites: FavoriteRecipeDto[] = [];
    snapshot.forEach(doc => {
      let favorite = doc.data()
      favorites.push(favorite)
    });
    return favorites;
  }

  // async delete(recipeId: string, accessToken: string) {
  //   await this.favoriteCollection.withConverter(this.favoriteConverter).where('/' + id).delete();
  // }
}


