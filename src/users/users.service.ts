import { Injectable } from '@nestjs/common';
import { CreateShoplistDto } from 'src/shoplists/dto/create-shoplist.dto';
import { UpdateShoplistDto } from 'src/shoplists/dto/update-shoplist.dto';
import { ShoplistDocument } from 'src/shoplists/documents/shoplist.document';
import { Shoplist } from 'src/shoplists/entities/shoplist.entity';

@Injectable()
export class UsersService {
  constructor(private shoplistDocument: ShoplistDocument) {}

  create(createShoplistDto: CreateShoplistDto): Promise<Shoplist> {
    const shoplist = new Shoplist(
      createShoplistDto.userId, 
      createShoplistDto.title, 
      createShoplistDto.favorite, 
      createShoplistDto.recipes
    );
    return this.shoplistDocument.create(shoplist);
  }

  findAll(): Promise<Shoplist[]> {
    return this.shoplistDocument.findAll();
  }

  findOne(id: string): Promise<Shoplist> {
    return this.shoplistDocument.findOne(id);
  }

  // ? Estritamente necessário com limitação de tempo ?
  update(id: number, updateShoplistDto: UpdateShoplistDto) {
    return `This action updates a #${id} shoplist`;
  }

  remove(id: string) {
    this.shoplistDocument.delete(id);
    return `This action removes a #${id} shoplist`;
  }
}
