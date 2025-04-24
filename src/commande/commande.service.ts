//commande.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from './entities/commande.entity';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { StatutCommande } from './entities/commande.entity';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
  ) {}

  async create(createCommandeDto: CreateCommandeDto): Promise<Commande> {
    const statut = createCommandeDto.statut || StatutCommande.EN_ATTENTE;

    const commande = this.commandeRepository.create({
      ...createCommandeDto,
      statut: statut as StatutCommande, // Ensuring the correct type
    });

    return this.commandeRepository.save(commande);
  }

  async findAll(): Promise<Commande[]> {
    return this.commandeRepository.find();
  }

  async findOne(id: number): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({ where: { id } });
    if (!commande) {
      throw new NotFoundException(`Commande with ID ${id} not found`);
    }
    return commande;
  }

  async update(
    id: number,
    updateCommandeDto: UpdateCommandeDto,
  ): Promise<Commande> {
    const commande = await this.findOne(id);
    Object.assign(commande, updateCommandeDto);
    return this.commandeRepository.save(commande);
  }

  async remove(id: number): Promise<void> {
    const result = await this.commandeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Commande with ID ${id} not found`);
    }
  }

  async suivreCommande(id: number): Promise<string> {
    const commande = await this.findOne(id);
    return commande.suivreCommande();
  }

  async payerEnLigne(id: number): Promise<string> {
    const commande = await this.findOne(id);
    return commande.payerEnLigne();
  }
}
