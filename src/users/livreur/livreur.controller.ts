import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { UpdateLivreurDto } from './dto/update-livreur.dto';
import { Livreur } from './entities/livreur.entity';

@Controller('livreur')
export class LivreurController {
  constructor(private readonly livreurService: LivreurService) {}

  @Post('create-livreur')
  create(@Body() createLivreurDto: CreateLivreurDto): Promise<Livreur> {
    return this.livreurService.create(createLivreurDto);
  }

  @Get('list-livreur')
  findAll(): Promise<Livreur[]> {
    return this.livreurService.findAll();
  }

  @Get('list-livreur/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Livreur> {
    return this.livreurService.findOne(id);
  }

  @Patch('update-livreur/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLivreurDto: UpdateLivreurDto,
  ): Promise<Livreur> {
    return this.livreurService.update(id, updateLivreurDto);
  }

  @Delete('delete-livreur/:id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.livreurService.remove(id);
  }
}
