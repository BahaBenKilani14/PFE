//plat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlatDto } from './dto/create-plat.dto';
import { UpdatePlatDto } from './dto/update-plat.dto';
import { Plat } from './entities/plat.entity';

@Injectable()
export class PlatService {
  constructor(
    @InjectRepository(Plat)
    private readonly platRepository: Repository<Plat>,
  ) {}

  private plats: { id: string; nom: string; description: string; prix: number; image?: string; disponible?: boolean }[] = [];

  async create(createPlatDto: CreatePlatDto): Promise<Plat> {
    const newPlat = this.platRepository.create(createPlatDto);
    return await this.platRepository.save(newPlat);
  }
  
  async findAll(): Promise<Plat[]> {
    return this.platRepository.find();
  }

  findOne(id: number) {
    return this.platRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePlatDto: UpdatePlatDto) {
    const plat = await this.findOne(id);
    if (!plat) {
      throw new Error(`Plat with id ${id} not found`);
    }
  
    const updated = Object.assign(plat, updatePlatDto);
    return this.platRepository.save(updated);
  }
  

  async remove(id: number) {
    const plat = await this.findOne(id);
    if (!plat) {
      throw new Error(`Plat with id ${id} not found`);
    }
    return this.platRepository.remove(plat);
  }
  
}
