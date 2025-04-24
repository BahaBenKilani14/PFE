import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { Traiteur } from 'src/users/traiteur/entities/traiteur.entity';
import { Livreur } from 'src/users/livreur/entities/livreur.entity';
import { Fournisseur } from 'src/users/fournisseur/entities/fournisseur.entity';
import { Admin } from 'src/users/admin/entities/admin.entity';

type Role = 'Demandeur' | 'Traiteur' | 'Fournisseur' | 'Livreur' | 'Admin';

@Injectable()
export class SharedAuthService {
  constructor(
    @InjectRepository(Demandeur) private readonly demandeurRepo: Repository<Demandeur>,
    @InjectRepository(Traiteur) private readonly traiteurRepo: Repository<Traiteur>,
    @InjectRepository(Livreur) private readonly livreurRepo: Repository<Livreur>,
    @InjectRepository(Fournisseur) private readonly fournisseurRepo: Repository<Fournisseur>,
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  // Register a user of a specific role
  async register(data: any, role: Role) {
    const repo = this.getRepoByRole(role);

    const existingUser = await repo.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new ConflictException(`${role} already exists with this email`);
    }

    const hashedPassword = await bcrypt.hash(data.motDePasse, 10);
    const user = repo.create({ ...data, motDePasse: hashedPassword });
    const savedUser = await repo.save(user);

    const payload = { sub: savedUser.id, email: savedUser.email, role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Login a user of a specific role
  async login(data: any, role: Role) {
    const repo = this.getRepoByRole(role);

    const user = await repo.findOne({ where: { email: data.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.motDePasse, user.motDePasse);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Utility: get correct repository by role
  private getRepoByRole(role: Role): Repository<any> {
    switch (role) {
      case 'Demandeur':
        return this.demandeurRepo;
      case 'Traiteur':
        return this.traiteurRepo;
      case 'Fournisseur':
        return this.fournisseurRepo;
      case 'Livreur':
        return this.livreurRepo;
      case 'Admin':
        return this.adminRepo;
      default:
        throw new Error('Invalid role');
    }
  }
}
