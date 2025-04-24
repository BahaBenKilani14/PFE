//traiteur.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TraiteurService } from './traiteur.service';
import { CreateTraiteurDto } from './dto/create-traiteur.dto';
import { UpdateTraiteurDto } from './dto/update-traiteur.dto';

@Controller('traiteur')
export class TraiteurController {
  constructor(private readonly traiteurService: TraiteurService) {}

  @Post('create-traiteur')
  create(@Body() createTraiteurDto: CreateTraiteurDto) {
    return this.traiteurService.create(createTraiteurDto);
  }

  @Get('list-traiteur')
  findAll() {
    return this.traiteurService.findAll();
  }

  @Get('list-traiteur/:id')
  findOne(@Param('id') id: string) {
    return this.traiteurService.findOne(+id);
  }

  @Patch('update-traiteur/:id')
  update(@Param('id') id: string, @Body() updateTraiteurDto: UpdateTraiteurDto) {
    return this.traiteurService.update(+id, updateTraiteurDto);
  }

  @Delete('delete-traiteur/:id')
  remove(@Param('id') id: string) {
    return this.traiteurService.remove(+id);
  }

  // 👉 gérerCommandes
  @Get('gerer-commandes/:id')
  gérerCommandes(@Param('id') id: string) {
    return this.traiteurService.gérerCommandes(+id);
  }

  // 👉 publierPlats
  @Get('publier-plats/:id')
  publierPlats(@Param('id') id: string) {
    return this.traiteurService.publierPlats(+id);
  }

  // 👉 gérerDisponibilité
  @Get('gerer-disponibilite/:id')
  gérerDisponibilité(@Param('id') id: string) {
    return this.traiteurService.gérerDisponibilité(+id);
  }
}
