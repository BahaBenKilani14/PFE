import { Module } from '@nestjs/common';
import { PlatService } from './plat.service';
import { PlatController } from './plat.controller';
import { Plat } from './entities/plat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Plat])],
  controllers: [PlatController],
  providers: [PlatService],
})
export class PlatModule {}
