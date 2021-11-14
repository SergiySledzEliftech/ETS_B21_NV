import { Test, TestingModule } from '@nestjs/testing';
import { UserCurrenciesController } from './user-currencies.controller';

describe('UserCurrenciesController', () => {
  let controller: UserCurrenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCurrenciesController],
    }).compile();

    controller = module.get<UserCurrenciesController>(UserCurrenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
