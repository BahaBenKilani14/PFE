//demandeur.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demandeur } from './entities/demandeur.entity';
import { CreateDemandeurDto } from './dto/create-demandeur.dto';
import { UpdateDemandeurDto } from './dto/update-demandeur.dto';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DemandeurService {
  constructor(
    @InjectRepository(Demandeur)
    private readonly demandeurRepository: Repository<Demandeur>,
  ) {}

  // Hash password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // Create a new demandeur
  async create(createDemandeurDto: CreateDemandeurDto): Promise<Demandeur> {
    // Hash the password
    const hashedPassword = await this.hashPassword(createDemandeurDto.motDePasse);
    
    const newDemandeur = this.demandeurRepository.create({
      ...createDemandeurDto,
      motDePasse: hashedPassword
    });
    
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
    // If password is being updated, hash it
    if (updateDemandeurDto.motDePasse) {
      updateDemandeurDto.motDePasse = await this.hashPassword(updateDemandeurDto.motDePasse);
    }
    
    await this.demandeurRepository.update(id, updateDemandeurDto);
    return this.findOne(id);  // Return the updated demandeur
  }

  // Remove a demandeur by ID
  async remove(id: number): Promise<void> {
    await this.demandeurRepository.delete(id);
  }
}
