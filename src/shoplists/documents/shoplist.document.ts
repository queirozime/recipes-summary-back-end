import { Inject, Injectable, Scope } from "@nestjs/common";
import { Shoplist } from "../entities/shoplist.entity";
import { CollectionReference, DocumentData, QueryDocumentSnapshot } from "@google-cloud/firestore";
import * as admin from 'firebase-admin';

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
        data.userId,
        data.title, 
        data.favorite, 
        data.recipes, 
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

  async create(shoplist: Shoplist): Promise<Shoplist> {
    const snapshot = await this.shoplistCollection.withConverter(this.shoplistConverter).add(shoplist);
    shoplist.setShoplistId(snapshot.id);
    return shoplist;
  }

  async findAll(token: string): Promise<Shoplist[]> {
    try{
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
      const snapshot = await this.shoplistCollection.withConverter(this.shoplistConverter).where('userId','==', uid).get();
      const shoplists: Shoplist[] = [];
      snapshot.forEach(doc => shoplists.push(doc.data()));
      return shoplists;
    }
    catch (error){
      console.log(error);
      return null;
    }
  }

  async findOne(id: string): Promise<Shoplist> {
    const snapshot = await this.shoplistCollection.withConverter(this.shoplistConverter).doc('/' + id).get();
    const shoplist = snapshot.data();
    return shoplist;
  }

  async update(): Promise<Shoplist> {
    return;
  }

  async delete(id: string) {
    await this.shoplistCollection.withConverter(this.shoplistConverter).doc('/' + id).delete();
  }
}


