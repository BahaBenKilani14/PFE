import { Module } from '@nestjs/common';
import { TraiteurService } from './traiteur.service';
import { TraiteurController } from './traiteur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Traiteur } from './entities/traiteur.entity';
import { Plat } from 'src/plat/entities/plat.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Traiteur,Plat])],
  controllers: [TraiteurController],
  providers: [TraiteurService],
})
export class TraiteurModule {}
