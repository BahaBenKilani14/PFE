// src/auth/demandeur-auth/demandeur-auth.service.ts

import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { RegisterDemandeurDto } from './dto/register-demandeur/register-demandeur.dto';
import { LoginDemandeurDto } from './dto/login-demandeur/login-demandeur.dto';

@Injectable()
export class DemandeurAuthService {
  constructor(
    @InjectRepository(Demandeur)
    private readonly demandeurRepository: Repository<Demandeur>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDemandeurDto) {
    console.log('Registering Demandeur with:', dto);
    const existing = await this.demandeurRepository.findOne({ where: { email: dto.email } });
    if (existing) throw new UnauthorizedException('Email already exists');

    const hashed = await bcrypt.hash(dto.motDePasse, 10);
    console.log('Hashed password:', hashed);

    const toSave = this.demandeurRepository.create({
      ...dto,
      motDePasse: hashed,
    });

    try {
      await this.demandeurRepository.save(toSave);
      console.log('Registration successful');
    } catch (error) {
      console.error('Error saving Demandeur:', error);
      throw new InternalServerErrorException('Error during registration');
    }

    return { message: 'Registration successful' };
  }

  async login(dto: LoginDemandeurDto) {
    const { email, motDePasse } = dto;
    const demandeur = await this.demandeurRepository.findOne({ where: { email } });
    if (!demandeur) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(motDePasse, demandeur.motDePasse);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: demandeur.id, role: 'Demandeur' };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: demandeur.id,
        email: demandeur.email,
        nom: demandeur.nom,
      },
    };
  }
}
