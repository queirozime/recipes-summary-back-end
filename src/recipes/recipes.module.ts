import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { AuthService } from 'src/firebase/auth.service';
import { RecipesController } from './recipes.controller';
import { RecipeDocument } from './documents/recipes.document';
import { FavoriteDocument } from './documents/favorites.document';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, RecipeDocument, FavoriteDocument, AuthService]
})
export class RecipesModule {}
