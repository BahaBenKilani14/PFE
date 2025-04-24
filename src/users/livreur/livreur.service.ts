//livreur.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livreur } from './entities/livreur.entity';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { UpdateLivreurDto } from './dto/update-livreur.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LivreurService {
  constructor(
    @InjectRepository(Livreur)
    private readonly livreurRepository: Repository<Livreur>,
  ) {}

  // Hash password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async create(createLivreurDto: CreateLivreurDto): Promise<Livreur> {
    // Hash the password
    if (createLivreurDto.motDePasse) {
      createLivreurDto.motDePasse = await this.hashPassword(createLivreurDto.motDePasse);
    }
    
    const livreur = this.livreurRepository.create(createLivreurDto);
    return await this.livreurRepository.save(livreur);
  }

  async findAll(): Promise<Livreur[]> {
    return await this.livreurRepository.find();
  }

  async findOne(id: number): Promise<Livreur> {
    const livreur = await this.livreurRepository.findOne({ where: { id } });
    if (!livreur) {
      throw new NotFoundException(`Livreur avec l'id ${id} introuvable`);
    }
    return livreur;
  }

  async update(id: number, updateLivreurDto: UpdateLivreurDto): Promise<Livreur> {
    // Hash the password if it's being updated
    if (updateLivreurDto.motDePasse) {
      updateLivreurDto.motDePasse = await this.hashPassword(updateLivreurDto.motDePasse);
    }
    
    const livreur = await this.livreurRepository.findOne({ where: { id } });
    if (!livreur) {
      throw new NotFoundException(`Livreur avec l'id ${id} introuvable`);
    }
    const updated = Object.assign(livreur, updateLivreurDto);
    return await this.livreurRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const livreur = await this.livreurRepository.findOne({ where: { id } });
    if (!livreur) {
      throw new NotFoundException(`Livreur avec l'id ${id} introuvable`);
    }
    await this.livreurRepository.remove(livreur);
  }
}
