import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeDocument } from './documents/recipes.document';
import { AuthService } from 'src/firebase/auth.service';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, RecipeDocument, AuthService]
})
export class RecipesModule {}
