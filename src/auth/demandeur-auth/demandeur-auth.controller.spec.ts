import { Test, TestingModule } from '@nestjs/testing';
import { DemandeurAuthController } from './demandeur-auth.controller';

describe('DemandeurAuthController', () => {
  let controller: DemandeurAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemandeurAuthController],
    }).compile();

    controller = module.get<DemandeurAuthController>(DemandeurAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
