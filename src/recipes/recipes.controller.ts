import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { AccessTokenDto } from './dto/access-token.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Post('favorite/:id')
  favorite(@Param('id') recipeId: string, @Body() accessTokenDto: AccessTokenDto) {
    return this.recipesService.favorite(accessTokenDto, recipeId);
  }

  @Get('favorite/all')
  findFavorites(@Body() accessTokenDto: AccessTokenDto) {
    return this.recipesService.findFavorites(accessTokenDto);
  }

  @Get('all')
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
