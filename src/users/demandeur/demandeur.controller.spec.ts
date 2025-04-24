import { Test, TestingModule } from '@nestjs/testing';
import { DemandeurController } from './demandeur.controller';
import { DemandeurService } from './demandeur.service';

describe('DemandeurController', () => {
  let controller: DemandeurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemandeurController],
      providers: [DemandeurService],
    }).compile();

    controller = module.get<DemandeurController>(DemandeurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
