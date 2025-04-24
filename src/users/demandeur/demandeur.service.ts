//demandeur.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demandeur } from './entities/demandeur.entity';
import { CreateDemandeurDto } from './dto/create-demandeur.dto';
import { UpdateDemandeurDto } from './dto/update-demandeur.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DemandeurService {
  constructor(
    @InjectRepository(Demandeur)
    private readonly demandeurRepository: Repository<Demandeur>,
  ) {}

  // Create a new demandeur
  async create(createDemandeurDto: CreateDemandeurDto): Promise<Demandeur> {
    const newDemandeur = this.demandeurRepository.create(createDemandeurDto);
    return this.demandeurRepository.save(newDemandeur);
  }

  // Find all demandeurs
  async findAll(): Promise<Demandeur[]> {
    return this.demandeurRepository.find();
  }

  // Find one demandeur by ID (throws exception if not found)
  async findOne(id: number): Promise<Demandeur> {
    const demandeur = await this.demandeurRepository.findOne({ where: { id } });

    if (!demandeur) {
      throw new NotFoundException(`Demandeur with ID ${id} not found`);
    }

    return demandeur;
  }

  // Update a demandeur by ID
  async update(id: number, updateDemandeurDto: UpdateDemandeurDto): Promise<Demandeur> {
    await this.demandeurRepository.update(id, updateDemandeurDto);
    return this.findOne(id);  // Return the updated demandeur
  }

  // Remove a demandeur by ID
  async remove(id: number): Promise<void> {
    await this.demandeurRepository.delete(id);
  }
}
