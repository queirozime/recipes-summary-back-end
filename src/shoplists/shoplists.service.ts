import { Inject, Injectable } from '@nestjs/common';
import { CreateShoplistDto } from './dto/create-shoplist.dto';
import { UpdateShoplistDto } from './dto/update-shoplist.dto';
import { ShoplistDocument } from './documents/shoplist.document';
import { Shoplist } from './entities/shoplist.entity';
import { CollectionReference } from '@google-cloud/firestore';

@Injectable()
export class ShoplistsService {
  constructor(
    @Inject(ShoplistDocument.collectionName)
    private shoplistCollection: CollectionReference<ShoplistDocument>
  ) {}

  async create(createShoplistDto: CreateShoplistDto): Promise<Shoplist> {
    const shoplist = new Shoplist(createShoplistDto.title, createShoplistDto.favorite, createShoplistDto.recipes);
    const shoplistDocument = new ShoplistDocument(this.shoplistCollection);
    return shoplistDocument.create(shoplist);
  }

  async findAll(): Promise<Shoplist[]> {
    const shoplistDocument = new ShoplistDocument(this.shoplistCollection); 
    return shoplistDocument.findAll();
  }

  async findOne(id: string): Promise<Shoplist> {
    const shoplistDocument = new ShoplistDocument(this.shoplistCollection); 
    return shoplistDocument.findOne(id);
  }

  // ? Estritamente necessário com limitação de tempo ?
  update(id: number, updateShoplistDto: UpdateShoplistDto) {
    return `This action updates a #${id} shoplist`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoplist`;
  }
}
