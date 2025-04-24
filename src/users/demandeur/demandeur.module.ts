import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeurService } from './demandeur.service';
import { DemandeurController } from './demandeur.controller';
import { Demandeur } from './entities/demandeur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demandeur])],  // Import Demandeur entity
  controllers: [DemandeurController],
  providers: [DemandeurService],
})
export class DemandeurModule {}

