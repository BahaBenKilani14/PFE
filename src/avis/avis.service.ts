//avis.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avis } from './entities/avi.entity';
import { CreateAvisDto } from './dto/create-avi.dto';
import { UpdateAvisDto } from './dto/update-avi.dto';

@Injectable()
export class AvisService {
  constructor(
    @InjectRepository(Avis)
    private readonly avisRepository: Repository<Avis>,
  ) {}

  async create(createAvisDto: CreateAvisDto): Promise<Avis> {
    const newAvis = this.avisRepository.create({
      ...createAvisDto,
      datePublication: new Date(), // auto-set current date
    });
    return this.avisRepository.save(newAvis);
  }

  async findAll(): Promise<Avis[]> {
    return this.avisRepository.find({ relations: ['demandeur', 'traiteur'] });
  }

  async findOne(id: number): Promise<Avis> {
    const avis = await this.avisRepository.findOne({
      where: { id },
      relations: ['demandeur', 'traiteur'],
    });

    if (!avis) throw new NotFoundException(`Avis #${id} not found`);
    return avis;
  }

  async update(id: number, updateAvisDto: UpdateAvisDto): Promise<Avis> {
    await this.avisRepository.update(id, updateAvisDto);
    const updatedAvis = await this.avisRepository.findOne({ where: { id } });
    if (!updatedAvis) throw new NotFoundException(`Avis #${id} not found`);
    return updatedAvis;
  }

  async remove(id: number): Promise<Avis> {
    const avis = await this.avisRepository.findOne({ where: { id } });
    if (!avis) throw new NotFoundException(`Avis #${id} not found`);
    await this.avisRepository.remove(avis);
    return avis;
  }
}
