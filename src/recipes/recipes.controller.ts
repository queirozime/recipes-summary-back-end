import { Controller, Get, Post, Body, Request, Param, Delete } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Post('favorite/:id')
  favorite(@Param('id') recipeId: string, @Request() req) {
    const token = req.headers.authorization;
    return this.recipesService.favorite(token, recipeId);
  }

  
  @Get('all')
  findAll() {
    return this.recipesService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }
  
  @Get('favorite/all')
  findFavorites(@Request() req) {
    const token = req.headers.authorization;
    return this.recipesService.findFavorites(token);
  }

  @Delete('disfavor/:id')
  disfavor(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization;
    return this.recipesService.disfavor(token, id);
  }
}
