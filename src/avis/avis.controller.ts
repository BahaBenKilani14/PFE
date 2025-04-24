//avis.controller.ts
import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { AvisService } from './avis.service';
import { CreateAvisDto } from './dto/create-avi.dto';
import { UpdateAvisDto } from './dto/update-avi.dto';

@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}

  // ➕ Créer un avis
  @Post('create-avis')
  create(@Body() createAvisDto: CreateAvisDto) {
    return this.avisService.create(createAvisDto);
  }

  // 📄 Récupérer tous les avis
  @Get('list-avis')
  findAll() {
    return this.avisService.findAll();
  }

  // 🔍 Récupérer un avis par ID
  @Get('list-avis/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.avisService.findOne(id);
  }

  // 🔁 Mettre à jour un avis
  @Patch('update-avis/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvisDto: UpdateAvisDto,
  ) {
    return this.avisService.update(id, updateAvisDto);
  }

  // ❌ Supprimer un avis
  @Delete('delete-avis/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.avisService.remove(id);
  }
}
