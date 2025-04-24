// demandeur.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { DemandeurService } from './demandeur.service';
import { CreateDemandeurDto } from './dto/create-demandeur.dto';
import { UpdateDemandeurDto } from './dto/update-demandeur.dto';
import { Demandeur } from './entities/demandeur.entity';

@Controller('demandeurs') // This will handle routes prefixed with /demandeurs
export class DemandeurController {
  constructor(private readonly demandeurService: DemandeurService) {}

  // Route to create a new demandeur
  @Post('create-demandeur')
  async create(@Body() createDemandeurDto: CreateDemandeurDto): Promise<Demandeur> {
    return this.demandeurService.create(createDemandeurDto);
  }

  // Route to get all demandeurs
  @Get('list-demandeur')
  async findAll(): Promise<Demandeur[]> {
    return this.demandeurService.findAll();
  }

  // Route to get a specific demandeur by ID
  @Get('list-demandeur/:id')
  async findOne(@Param('id') id: number): Promise<Demandeur> {
    return this.demandeurService.findOne(id);
  }

  // Route to update a specific demandeur by ID
  @Put('update-demandeur/:id')
  async update(
    @Param('id') id: number,
    @Body() updateDemandeurDto: UpdateDemandeurDto,
  ): Promise<Demandeur> {
    return this.demandeurService.update(id, updateDemandeurDto);
  }

  // Route to delete a specific demandeur by ID
  @Delete('delete-demandeur/:id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.demandeurService.remove(id);
  }
}
