import { Test, TestingModule } from '@nestjs/testing';
import { TraiteurService } from './traiteur.service';

describe('TraiteurService', () => {
  let service: TraiteurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraiteurService],
    }).compile();

    service = module.get<TraiteurService>(TraiteurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
