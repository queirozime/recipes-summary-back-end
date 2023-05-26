import { Inject, Injectable } from "@nestjs/common";
import { Shoplist } from "../entities/shoplist.entity";
import { CollectionReference, DocumentData, QueryDocumentSnapshot, Timestamp } from "@google-cloud/firestore";
import { Ingredient } from "../interfaces/ingredient.interface";

@Injectable()
export class ShoplistDocument {
  static collectionName = 'Shoplists';
  
  private title: string;
  private favorite: boolean;
  private lastAlterationdate: Timestamp;
  private ingredients: Ingredient[];
  // Conversor de tipo para utilização dos métodos de DocumentReference<ShoplistDocument>
  // TODO: Configurar fromFirebase e descobrir onde pôr isso
  private shoplistConverter = {
    toFirestore(shoplist: Shoplist): DocumentData {
      return {  
        title: shoplist.getTitle(),
        favorite: shoplist.isFavorite(),
        lastAlterationdate: shoplist.getLastAlterationDate(),
        ingredients: shoplist.getIngredients()
      }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Shoplist {
      return
    }
  };

  constructor(
    @Inject(ShoplistDocument.collectionName)
    private shoplistCollection: CollectionReference<ShoplistDocument>
  ) {}

  async create(shoplist: Shoplist): Promise<Shoplist> {
    const doc = this.shoplistCollection.doc();
    doc.withConverter(this.shoplistConverter).set(shoplist);
    return shoplist;
  }
}


