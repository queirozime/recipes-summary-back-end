import { Inject, Injectable, Scope } from "@nestjs/common";
import { Shoplist } from "../entities/shoplist.entity";
import { UpdateShoplistDto } from "../dto/update-shoplist.dto";
import { CollectionReference, DocumentData, QueryDocumentSnapshot } from "@google-cloud/firestore";
import * as admin from 'firebase-admin';
import { ResponseShoplistDto } from "../dto/response-shoplist.dto";
import { Recipe } from "src/recipes/entities/recipe.entity";

@Injectable({scope: Scope.REQUEST})
export class ShoplistDocument {
  static collectionName = 'Shoplists';
  
  private shoplistConverter = { // Conversor de objetos Firebase
    toFirestore(shoplist: Shoplist): DocumentData {
      return {  
        userId: shoplist.getUserId(),
        title: shoplist.getTitle(),
        favorite: shoplist.isFavorite(),
        lastAlterationDate: shoplist.getLastAlterationDate(),
        recipes: shoplist.getRecipes(),
        ingredients: shoplist.getIngredients()
      }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Shoplist {
      const data = snapshot.data();
      const shoplist = new Shoplist(
        data.title, 
        data.favorite, 
        data.recipes, 
        data.userId,
        data.lastAlterationDate, 
        data.ingredients
      );
      shoplist.setShoplistId(snapshot.id);
      return shoplist;
    }
  };

  constructor(
    @Inject(ShoplistDocument.collectionName)
    private shoplistCollection: CollectionReference<ShoplistDocument>
  ) {}

  async create(shoplist: Shoplist): Promise<ResponseShoplistDto> {
    const snapshot = await this.shoplistCollection.withConverter(this.shoplistConverter).add(shoplist);
    shoplist.setShoplistId(snapshot.id);
    const responseShoplistDto = new ResponseShoplistDto(shoplist);
    return responseShoplistDto;
  }

  async changeFavorite(recipeId: string, state: boolean) {
    try {
      let shopList = await this.findOne(recipeId);
      shopList.setFavorite(state);
      const snapshot = await this.shoplistCollection
        .withConverter(this.shoplistConverter)
        .doc('/' + recipeId)
        .set(shopList);
      return snapshot;
    }
    catch(error) {
      console.log(error);
      return null;
    }
  }

  async findAll(token: string): Promise<Shoplist[]> {
    try{
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
      const snapshot = await this.shoplistCollection.withConverter(this.shoplistConverter).where('userId','==', uid).get();
      const shoplists: Shoplist[] = [];
      if(!snapshot.empty){
        snapshot.forEach(doc => {
          let shoplist = doc.data()
          shoplist.setShoplistId(doc.id)
          shoplists.push(shoplist)
        });
      }
      return shoplists;
    }
    catch (error){
      console.log(error);
      return null;
    }
  }

  async findOne(id: string): Promise<Shoplist> {
    try {
      const snapshot = await this.shoplistCollection.withConverter(this.shoplistConverter).doc('/' + id).get();
      const shoplist = snapshot.data();
      if(shoplist) {
        shoplist.setShoplistId(snapshot.id)
        return shoplist;
      }
      else return null;
    }
    catch (error){
      console.log(error);
      return null;
    }
  }


  async updatePortion(updateShoplistDto: UpdateShoplistDto, id: string): Promise<ResponseShoplistDto> {
    let shoplist = await this.findOne(id);
    shoplist.setRecipes(updateShoplistDto.recipes)
    try {
       await this.shoplistCollection
        .withConverter(this.shoplistConverter)
        .doc('/' + id)
        .set(shoplist)
      const responseShoplistDto = new ResponseShoplistDto(shoplist);
      return responseShoplistDto;
    }
    catch (error){
      console.log(error);
      return null;
    }
  }

  async delete(id: string) {
    try {
      const snapshot = await this.shoplistCollection.withConverter(this.shoplistConverter).doc('/' + id).delete();
      return snapshot;
    }
    catch (error){
      console.log(error);
      return null;
    }
  }
}


