import { Test, TestingModule } from '@nestjs/testing';
import { ShoplistsController } from './shoplists.controller';
import { ShoplistsService } from './shoplists.service';

describe('ShoplistsController', () => {
  let controller: ShoplistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoplistsController],
      providers: [ShoplistsService],
    }).compile();

    controller = module.get<ShoplistsController>(ShoplistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
