
//fournisseur.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fournisseur } from './entities/fournisseur.entity';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';

@Injectable()
export class FournisseurService {
  constructor(
    @InjectRepository(Fournisseur)
    private readonly fournisseurRepository: Repository<Fournisseur>,
  ) {}

  // Create a new fournisseur
  async create(createFournisseurDto: CreateFournisseurDto) {
    const newFournisseur = this.fournisseurRepository.create(createFournisseurDto);
    return this.fournisseurRepository.save(newFournisseur);
  }

  // Find all fournisseurs
  async findAll() {
    return this.fournisseurRepository.find();
  }

  // Find one fournisseur by id
  async findOne(id: number) {
    const fournisseur = await this.fournisseurRepository.findOne({ where: { id } });
    if (!fournisseur) {
      throw new NotFoundException(`Fournisseur with ID ${id} not found`);
    }
    return fournisseur;
  }

  // Update a fournisseur by id
  async update(id: number, updateFournisseurDto: UpdateFournisseurDto) {
    await this.fournisseurRepository.update(id, updateFournisseurDto);
    return this.fournisseurRepository.findOne({ where: { id } });
  }

  // Remove a fournisseur by id
  async remove(id: number) {
    const fournisseur = await this.fournisseurRepository.findOne({ where: { id } });
    if (fournisseur) {
      await this.fournisseurRepository.remove(fournisseur);
    }
    return fournisseur;
  }

  // Custom method: consulterProfilTraiteur
  async consulterProfilTraiteur(id: number): Promise<Fournisseur> {
    const fournisseur = await this.fournisseurRepository.findOne({ where: { id } });
    if (!fournisseur) {
      throw new NotFoundException(`Fournisseur with ID ${id} not found`);
    }
    return fournisseur; // You can customize this to return more specific information
  }

  // Custom method: offreIngrédients
  async offreIngrédients(id: number): Promise<string> {
    const fournisseur = await this.fournisseurRepository.findOne({ where: { id } });
    if (!fournisseur) {
      throw new NotFoundException(`Fournisseur with ID ${id} not found`);
    }
    return 'Ingredients offered by fournisseur'; // Replace this with actual logic
  }
}
