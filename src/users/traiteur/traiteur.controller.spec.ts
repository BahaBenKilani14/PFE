import { Test, TestingModule } from '@nestjs/testing';
import { TraiteurController } from './traiteur.controller';
import { TraiteurService } from './traiteur.service';

describe('TraiteurController', () => {
  let controller: TraiteurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TraiteurController],
      providers: [TraiteurService],
    }).compile();

    controller = module.get<TraiteurController>(TraiteurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
