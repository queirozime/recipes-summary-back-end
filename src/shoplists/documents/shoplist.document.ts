import { Inject, Injectable } from "@nestjs/common";
import { Shoplist } from "../entities/shoplist.entity";
import { CollectionReference, DocumentData, QueryDocumentSnapshot } from "@google-cloud/firestore";

@Injectable()
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
    //TODO: Alterar método fromFirestore para retornar Recipe[]
    fromFirestore(snapshot: QueryDocumentSnapshot): Shoplist {
      const data = snapshot.data();
      return new Shoplist(data.title, data.favorite, [], data.lastAlterationDate, data.ingredients);
    }
  };

  constructor(
    @Inject(ShoplistDocument.collectionName)
    private shoplistCollection: CollectionReference<ShoplistDocument>
  ) {}

  async create(shoplist: Shoplist): Promise<Shoplist> {
    const doc = this.shoplistCollection.doc();
    await doc.withConverter(this.shoplistConverter).set(shoplist);
    shoplist.setId(doc.id);
    return shoplist;
  }

  async findAll(): Promise<Shoplist[]> {
    const snapshot = await this.shoplistCollection.withConverter(this.shoplistConverter).get();
    const shoplists: Shoplist[] = [];
    snapshot.forEach(doc => shoplists.push(doc.data()));
    return shoplists;
  }

  async findOne(id: string): Promise<Shoplist> {
    const doc = await this.shoplistCollection.withConverter(this.shoplistConverter).doc('/' + id).get();
    const shoplist = doc.data();
    return shoplist;
  }
}


