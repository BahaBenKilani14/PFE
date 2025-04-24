import { Module } from '@nestjs/common';
import { AvisService } from './avis.service';
import { AvisController } from './avis.controller';
import { Avis } from './entities/avi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Avis])],
  controllers: [AvisController],
  providers: [AvisService],
})
export class AvisModule {}
