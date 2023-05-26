import { Shoplist } from "../entities/shoplist.entity";
import { CollectionReference, DocumentData, QueryDocumentSnapshot, Timestamp } from "@google-cloud/firestore";

export class ShoplistDocument {
  static collectionName = 'Shoplists';
  
  private shoplistConverter = { // Conversor de objetos Firebase
    toFirestore(shoplist: Shoplist): DocumentData {
      return {  
        title: shoplist.getTitle(),
        favorite: shoplist.isFavorite(),
        lastAlterationdate: shoplist.getLastAlterationDate(),
        ingredients: shoplist.getIngredients()
      }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Shoplist {
      const data = snapshot.data();
      return new Shoplist(data.title, data.favorite, []);
    }
  };

  constructor(private shoplistCollection: CollectionReference<ShoplistDocument>) {}

  async create(shoplist: Shoplist): Promise<Shoplist> {
    const doc = this.shoplistCollection.doc();
    await doc.withConverter(this.shoplistConverter).set(shoplist);
    shoplist.setId(doc.id);
    return shoplist;
  }
}


