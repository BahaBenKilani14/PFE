import { Test, TestingModule } from '@nestjs/testing';
import { DemandeurService } from './demandeur.service';

describe('DemandeurService', () => {
  let service: DemandeurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemandeurService],
    }).compile();

    service = module.get<DemandeurService>(DemandeurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
