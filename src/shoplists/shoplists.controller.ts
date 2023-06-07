import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { CreateShoplistDto } from 'src/shoplists/dto/create-shoplist.dto';
import { UpdateShoplistDto } from 'src/shoplists/dto/update-shoplist.dto';
import { ShoplistsService } from './shoplists.service';
import { AddRecipeDto } from './dto/add-recipe.dto';

@Controller('shoplists')
export class ShoplistsController {
  constructor(private readonly shoplistService: ShoplistsService) {}

  @Post('create')
  create(@Body() createShoplistDto: CreateShoplistDto) {
    return this.shoplistService.create(createShoplistDto);
  }

  @Patch('favorite/:id')
  favorite(@Param('id') recipeId: string) {
    return this.shoplistService.favorite(recipeId);
  }

  @Patch('disfavor/:id')
  disfavor(@Param('id') recipeId: string) {
    return this.shoplistService.disfavor(recipeId);
  }

  @Get()
  findAll(@Request() req) {
    const token = req.headers.authorization;
    return this.shoplistService.findAll(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoplistService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoplistDto: UpdateShoplistDto) {
    return this.shoplistService.update(id, updateShoplistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoplistService.remove(id);
  }
}