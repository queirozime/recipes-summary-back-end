import { Injectable, Inject } from '@nestjs/common';
import { CreateShoplistDto } from './dto/create-shoplist.dto';
import { UpdateShoplistDto } from './dto/update-shoplist.dto';
import { CollectionReference } from '@google-cloud/firestore';
import { Shoplist } from './documents/shoplist.document';
import { Ingredient } from './interfaces/ingredient.interface';

@Injectable()
export class ShoplistsService {
  constructor(
    @Inject(Shoplist.collectionName)
    private shoplistCollection: CollectionReference<Shoplist>,
  ) {}

  async create(createShoplistDto: CreateShoplistDto): Promise<Shoplist> {
    // TODO: Criar função updateLastAlterationDate() para atualizar a data de alteração da lista
    // TODO: Reorgazinar a estrutura da função passando alguns métodos para uma classe Shoplist
    const recipes = createShoplistDto.recipes;
    const shoplist: Ingredient[] = [];

    // Cria uma array com os ingredientes de todas as receitas de lista poderados pela porção
    const arr: Ingredient[] = recipes.reduce((accumulator, { basePortion, portion, ingredients }) => {
      const arr = ingredients.map((element) => {
        const weight = portion / basePortion;
        return {...element, qty: element.qty * weight};
      });
      return [...accumulator, ...arr];
    }, []);

    // Analisa a quantidade de ocorrências de cada ingrediente e soma suas quantidades
    arr.forEach((element) => {
      const index = shoplist.findIndex((target) => element.name === target.name && element.unit === target.unit);
      if (index !== -1) shoplist[index].qty += element.qty;
      else shoplist.push(element);
    });

    // Armazena no banco de dados
    const doc = {...createShoplistDto, ingredients: shoplist};
    await this.shoplistCollection.add(doc);

    return doc;
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
