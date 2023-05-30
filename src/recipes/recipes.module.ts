import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeDocument } from './documents/recipes.document';
import { FavoriteDocument } from './documents/favorites.document';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, RecipeDocument, FavoriteDocument]
})
export class RecipesModule {}
