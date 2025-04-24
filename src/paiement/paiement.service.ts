//paiement.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paiement } from './entities/paiement.entity'; // Assuming Paiement entity is defined
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';

@Injectable()
export class PaiementService {
  constructor(
    @InjectRepository(Paiement)
    private readonly paiementRepository: Repository<Paiement>, // Injecting the repository for Paiement entity
  ) {}

  // Create a new paiement
  async create(createPaiementDto: CreatePaiementDto): Promise<Paiement> {
    const newPaiement = this.paiementRepository.create(createPaiementDto); // Create an entity instance
    return this.paiementRepository.save(newPaiement); // Save it to the database
  }

  // Find all paiements
  async findAll(): Promise<Paiement[]> {
    return this.paiementRepository.find(); // Retrieve all paiements from the database
  }

  // Find a single paiement by ID
  async findOne(id: number): Promise<Paiement> {
    const paiement = await this.paiementRepository.findOne({ where: { id } });;
    if (!paiement) {
      throw new Error(`Paiement with ID ${id} not found`); // Handle case when paiement is not found
    }
    return paiement;
  }

  // Update a paiement by ID
  async update(id: number, updatePaiementDto: UpdatePaiementDto): Promise<Paiement> {
    const paiement = await this.paiementRepository.preload({
      id,
      ...updatePaiementDto,
    });
    if (!paiement) {
      throw new Error(`Paiement with ID ${id} not found`); // Handle case when paiement is not found
    }
    return this.paiementRepository.save(paiement); // Save the updated paiement
  }

  // Remove a paiement by ID
  async remove(id: number): Promise<void> {
    const paiement = await this.paiementRepository.findOne({ where: { id } });;
    if (!paiement) {
      throw new Error(`Paiement with ID ${id} not found`); // Handle case when paiement is not found
    }
    await this.paiementRepository.remove(paiement); // Delete the paiement from the database
  }
}
