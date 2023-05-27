import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoplistsService } from './shoplists.service';
import { CreateShoplistDto } from './dto/create-shoplist.dto';
import { UpdateShoplistDto } from './dto/update-shoplist.dto';

@Controller('shoplists')
export class ShoplistsController {
  constructor(private readonly shoplistsService: ShoplistsService) {}

  @Post('create')
  create(@Body() createShoplistDto: CreateShoplistDto) {
    return this.shoplistsService.create(createShoplistDto);
  }

  @Get('all')
  findAll() {
    return this.shoplistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoplistsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoplistDto: UpdateShoplistDto) {
    return this.shoplistsService.update(+id, updateShoplistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoplistsService.remove(id);
  }
}
