//fournisseur.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';

@Controller('fournisseur')
export class FournisseurController {
  constructor(private readonly fournisseurService: FournisseurService) {}

  @Post('create-fournisseur')
  create(@Body() createFournisseurDto: CreateFournisseurDto) {
    return this.fournisseurService.create(createFournisseurDto);
  }

  @Get('list-fournisseur')
  findAll() {
    return this.fournisseurService.findAll();
  }

  @Get('list-fournisseur/:id')
  findOne(@Param('id') id: string) {
    return this.fournisseurService.findOne(+id);
  }

  @Patch('update-fournisseur/:id')
  update(@Param('id') id: string, @Body() updateFournisseurDto: UpdateFournisseurDto) {
    return this.fournisseurService.update(+id, updateFournisseurDto);
  }

  @Delete('delete-fournisseur/:id')
  remove(@Param('id') id: string) {
    return this.fournisseurService.remove(+id);
  }

  // 👉 Custom method: consulterProfilTraiteur
  @Get('profil-traiteur/:id')
  consulterProfilTraiteur(@Param('id') id: string) {
    return this.fournisseurService.consulterProfilTraiteur(+id);
  }

  // 👉 Custom method: offreIngrédients
  @Get('offre-ingredients/:id')
  offreIngrédients(@Param('id') id: string) {
    return this.fournisseurService.offreIngrédients(+id);
  }
}
