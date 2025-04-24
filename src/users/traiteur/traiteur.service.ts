//traiteur.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Traiteur } from './entities/traiteur.entity';
import { CreateTraiteurDto } from './dto/create-traiteur.dto';
import { UpdateTraiteurDto } from './dto/update-traiteur.dto';
import { Plat } from 'src/plat/entities/plat.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TraiteurService {
  constructor(
    @InjectRepository(Traiteur)
    private readonly traiteurRepository: Repository<Traiteur>,
    @InjectRepository(Plat)
    private readonly platRepository: Repository<Plat>,
  ) {}

  // Hash password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // Create a new traiteur
  async create(createTraiteurDto: CreateTraiteurDto) {
    const { listePlats, ...traiteurData } = createTraiteurDto;
    
    // Hash the password
    if (traiteurData.motDePasse) {
      traiteurData.motDePasse = await this.hashPassword(traiteurData.motDePasse);
    }
    
    // Create the traiteur entity
    const newTraiteur = this.traiteurRepository.create(traiteurData);
    
    // Find plats by their ids
    if (listePlats && listePlats.length > 0) {
      newTraiteur.listePlats = await this.platRepository.findByIds(listePlats);
    } else {
      newTraiteur.listePlats = [];
    }
    
    return this.traiteurRepository.save(newTraiteur);
  }

  // Find all traiteurs
  async findAll() {
    return this.traiteurRepository.find({ relations: ['listePlats'] });
  }

  // Find one traiteur by id
  async findOne(id: number) {
    return this.traiteurRepository.findOne({ 
      where: { id },
      relations: ['listePlats']
    });
  }

  // Update a traiteur by id
  async update(id: number, updateTraiteurDto: UpdateTraiteurDto) {
    const { listePlats, ...traiteurData } = updateTraiteurDto;
    
    // Hash the password if it's being updated
    if (traiteurData.motDePasse) {
      traiteurData.motDePasse = await this.hashPassword(traiteurData.motDePasse);
    }
    
    // Update basic traiteur data
    await this.traiteurRepository.update(id, traiteurData);
    
    // If listePlatsIds is provided, update the relation
    if (listePlats) {
      const traiteur = await this.traiteurRepository.findOne({ 
        where: { id },
        relations: ['listePlats']
      });
      
      if (traiteur) {
        traiteur.listePlats = await this.platRepository.findByIds(listePlats);
        await this.traiteurRepository.save(traiteur);
      }
    }
    
    return this.findOne(id);
  }

  // Remove a traiteur by id
  async remove(id: number) {
    const traiteur = await this.traiteurRepository.findOne({ 
      where: { id },
      relations: ['listePlats']
    });
    
    if (traiteur) {
      await this.traiteurRepository.remove(traiteur);
    }
    
    return traiteur;
  }

  // Custom method: gérerCommandes
  async gérerCommandes(id: number) {
    return `Gérer commandes for traiteur with id ${id}`;
  }

  // Custom method: publierPlats
  async publierPlats(id: number) {
    return `Publier plats for traiteur with id ${id}`;
  }

  // Custom method: gérerDisponibilité
  async gérerDisponibilité(id: number) {
    return `Gérer disponibilité for traiteur with id ${id}`;
  }
}