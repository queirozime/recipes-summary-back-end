import { Injectable, Inject } from '@nestjs/common';
import { CreateShoplistDto } from './dto/create-shoplist.dto';
import { UpdateShoplistDto } from './dto/update-shoplist.dto';
import { CollectionReference } from '@google-cloud/firestore';
import { Shoplist } from './documents/shoplist.document';

@Injectable()
export class ShoplistsService {
  constructor(
    @Inject(Shoplist.collectionName)
    private shoplistCollection: CollectionReference<Shoplist>,
  ) {}

  async create(createShoplistDto: CreateShoplistDto): Promise<Shoplist> {
    // Acessa um objeto dentro de outro objeto
    const getNestedObject = (nestedObj: object[], pathArr: any[]) => {
      return pathArr.reduce(
        (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : null),
        nestedObj
      );
    };

    // TODO: Criar método de contagem de ingredients 
    const recipes = createShoplistDto.recipes;
    const ingredients = getNestedObject(recipes, [0, 'ingredients']);
    console.log(ingredients);
    return
  }

  findAll() {
    return `This action returns all shoplists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoplist`;
  }

  update(id: number, updateShoplistDto: UpdateShoplistDto) {
    return `This action updates a #${id} shoplist`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoplist`;
  }
}
