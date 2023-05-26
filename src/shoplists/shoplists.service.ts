import { Injectable } from '@nestjs/common';
import { CreateShoplistDto } from './dto/create-shoplist.dto';
import { UpdateShoplistDto } from './dto/update-shoplist.dto';
import { ShoplistDocument } from './documents/shoplist.document';
import { Shoplist } from './entities/shoplist.entity';

@Injectable()
export class ShoplistsService {
  async create(createShoplistDto: CreateShoplistDto): Promise<Shoplist> {
    const shoplist = new Shoplist(createShoplistDto.title, createShoplistDto.favorite, createShoplistDto.recipes);

    return shoplist;
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
