import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateShoplistDto } from 'src/shoplists/dto/create-shoplist.dto';
import { UpdateShoplistDto } from 'src/shoplists/dto/update-shoplist.dto';
import { ShoplistsService } from './shoplists.service';

@Controller('shoplists')
export class ShoplistsController {
  constructor(private readonly shoplistService: ShoplistsService) {}

  @Post('create')
  create(@Body() createShoplistDto: CreateShoplistDto) {
    return this.shoplistService.create(createShoplistDto);
  }

  @Get()
  findAll(@Query('user') userId: string) {
    return this.shoplistService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoplistService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoplistDto: UpdateShoplistDto) {
    return this.shoplistService.update(+id, updateShoplistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoplistService.remove(id);
  }
}