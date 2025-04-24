// demandeur.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { DemandeurService } from './demandeur.service';
import { CreateDemandeurDto } from './dto/create-demandeur.dto';
import { UpdateDemandeurDto } from './dto/update-demandeur.dto';
import { Demandeur } from './entities/demandeur.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreate, ApiDelete, ApiGetAll, ApiGetById, ApiUpdate } from '../../utils/swagger-generator';

@ApiTags('demandeurs')
@Controller('demandeurs')
export class DemandeurController {
  constructor(private readonly demandeurService: DemandeurService) {}

  // Route to create a new demandeur
  @Post()
  @ApiCreate('demandeur')
  async create(@Body() createDemandeurDto: CreateDemandeurDto): Promise<Demandeur> {
    return this.demandeurService.create(createDemandeurDto);
  }

  // Route to get all demandeurs
  @Get()
  @ApiGetAll('Get all demandeurs', 'Returns a list of all registered demandeurs')
  async findAll(): Promise<Demandeur[]> {
    return this.demandeurService.findAll();
  }

  // Route to get a specific demandeur by ID
  @Get(':id')
  @ApiGetById('demandeur')
  async findOne(@Param('id') id: string): Promise<Demandeur> {
    return this.demandeurService.findOne(+id);
  }

  // Route to update a specific demandeur by ID
  @Patch(':id')
  @ApiUpdate('demandeur')
  async update(
    @Param('id') id: string,
    @Body() updateDemandeurDto: UpdateDemandeurDto,
  ): Promise<Demandeur> {
    return this.demandeurService.update(+id, updateDemandeurDto);
  }

  // Route to delete a specific demandeur by ID
  @Delete(':id')
  @ApiDelete('demandeur')
  async remove(@Param('id') id: string): Promise<void> {
    return this.demandeurService.remove(+id);
  }
}
