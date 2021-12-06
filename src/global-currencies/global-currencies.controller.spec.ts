import { Test, TestingModule } from '@nestjs/testing';
import { GlobalCurrenciesController } from './global-currencies.controller';

describe('GlobalCurrenciesController', () => {
  let controller: GlobalCurrenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalCurrenciesController],
    }).compile();

    controller = module.get<GlobalCurrenciesController>(GlobalCurrenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
