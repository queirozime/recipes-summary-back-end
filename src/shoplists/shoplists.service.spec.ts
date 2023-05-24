import { Test, TestingModule } from '@nestjs/testing';
import { ShoplistsService } from './shoplists.service';

describe('ShoplistsService', () => {
  let service: ShoplistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoplistsService],
    }).compile();

    service = module.get<ShoplistsService>(ShoplistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
