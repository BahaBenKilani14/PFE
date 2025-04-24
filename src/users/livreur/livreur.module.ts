import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livreur } from './entities/livreur.entity';
import { LivreurController } from './livreur.controller';
import { LivreurService } from './livreur.service';

@Module({
  imports: [TypeOrmModule.forFeature([Livreur])],
  controllers: [LivreurController],
  providers: [LivreurService],
})
export class LivreurModule {}
