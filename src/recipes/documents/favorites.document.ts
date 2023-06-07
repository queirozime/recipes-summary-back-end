import { Inject, Injectable, Scope } from "@nestjs/common";
import { Recipe } from "../entities/recipe.entity";
import { CollectionReference, DocumentData, QueryDocumentSnapshot, Firestore } from "@google-cloud/firestore";
import { FavoriteRecipeDto } from "../dto/favorite-recipe.dto";
import { AuthService } from "src/firebase/auth.service";
import * as admin from  'firebase-admin'

@Injectable({scope: Scope.REQUEST})
export class FavoriteDocument {
  static collectionName = 'FavoriteRecipes';
  static authService: AuthService;
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
    private favoriteCollection: CollectionReference<FavoriteDocument>,
    private authService: AuthService
  ) { this.authService = authService;}

  async favorite(recipe: Recipe, token: string): Promise<FavoriteRecipeDto> {
    try {
      console.log("Token: " + token)
      const uid = await this.authService.verifyTokenAndReturnUid(token);
      if(uid) {
        const favorite = new FavoriteRecipeDto(
          recipe.getTitle(),
          recipe.getBasePortion(),
          recipe.getPreparationTime(),
          recipe.getImageUrl(),
          recipe.getId(),
          uid
          );
        await this.favoriteCollection.withConverter(this.favoriteConverter).add(favorite);
        return favorite;
      }
      else {
        console.log("Token inválido");
        return null;
      }
    }
    catch (error) {
      console.log(error);
      return null; // or return any default value as per your requirement
    }
  }

  async findFavorites(token: string): Promise<FavoriteRecipeDto[]> {  
    try {
      const uid = await this.authService.verifyTokenAndReturnUid(token);
      if(uid) {
        const snapshot = await this.favoriteCollection.withConverter(this.favoriteConverter).where('userId', '==', uid).get();
        const favorites: FavoriteRecipeDto[] = [];
        if(!snapshot.empty)
          snapshot.forEach(doc => {
            let favorite = doc.data();
            favorite.setId(doc.id);
            favorites.push(favorite);
          });
        return favorites;
      }
      else {
        console.log("Token inválido");
        return null;
      }
    }
    catch(error) {
      console.log(error);
      return null; // or return any default value as per your requirement
    }
  }

  async disfavor(token: string, recipeId: string) {
    const userFavorites = await this.findFavorites(token);
    const selectedFavorite =  userFavorites.find( doc => doc.getRecipeId() == recipeId);
    try {
      await this.favoriteCollection.withConverter(this.favoriteConverter).doc('/' + selectedFavorite.getId()).delete();
      return true;
    }
    catch(error) {
      console.log(error);
      return null; // or return any default value as per your requirement
    }
  }
}


