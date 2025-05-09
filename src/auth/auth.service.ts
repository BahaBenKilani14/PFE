import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificationToken } from './verification-token.entity';
import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { Admin } from 'src/users/admin/entities/admin.entity';
import { Traiteur } from 'src/users/traiteur/entities/traiteur.entity';
import { Livreur } from 'src/users/livreur/entities/livreur.entity';
import { Fournisseur } from 'src/users/fournisseur/entities/fournisseur.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(VerificationToken)
    private readonly verificationTokenRepo: Repository<VerificationToken>,
    @InjectRepository(Demandeur)
    private readonly demandeurRepo: Repository<Demandeur>,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    @InjectRepository(Traiteur)
    private readonly traiteurRepo: Repository<Traiteur>,
    @InjectRepository(Livreur)
    private readonly livreurRepo: Repository<Livreur>,
    @InjectRepository(Fournisseur)
    private readonly fournisseurRepo: Repository<Fournisseur>,
    private readonly jwtService: JwtService, // Inject JwtService for token generation
  ) {}

  // Login method
  async login(email: string, motDePasse: string): Promise<any> {
    let user;
  
    // Search for the user in all repositories
    user =
      (await this.demandeurRepo.findOne({ where: { email } })) ||
      (await this.adminRepo.findOne({ where: { email } })) ||
      (await this.traiteurRepo.findOne({ where: { email } })) ||
      (await this.livreurRepo.findOne({ where: { email } })) ||
      (await this.fournisseurRepo.findOne({ where: { email } }));
  
    // Check if the user exists
    if (!user) {
      throw new Error('Invalid credentials');
    }
  
    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }
  
    // Generate a JWT token
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  // Register method
  async register(payload: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(payload.motDePasse, 10);

    switch (payload.role) {
      case 'demandeur':
        return this.demandeurRepo.save({ ...payload, motDePasse: hashedPassword });
      case 'admin':
        return this.adminRepo.save({ ...payload, motDePasse: hashedPassword });
      case 'traiteur':
        return this.traiteurRepo.save({ ...payload, motDePasse: hashedPassword });
      case 'livreur':
        return this.livreurRepo.save({ ...payload, motDePasse: hashedPassword });
      case 'fournisseur':
        return this.fournisseurRepo.save({ ...payload, motDePasse: hashedPassword });
      default:
        throw new Error('Invalid role');
    }
  }

  // Verify email method
  async verifyEmail(token: string): Promise<boolean> {
    const verificationToken = await this.verificationTokenRepo.findOne({
      where: { token },
      relations: ['demandeur', 'admin', 'traiteur', 'livreur', 'fournisseur'],
    });

    if (!verificationToken) {
      throw new Error('Invalid or expired token');
    }

    verificationToken.verifiedAt = new Date();
    await this.verificationTokenRepo.save(verificationToken);

    // Perform user-specific actions based on the userType
    if (verificationToken.demandeur) {
      verificationToken.demandeur.emailVerified = true;
      await this.demandeurRepo.save(verificationToken.demandeur);
    } else if (verificationToken.admin) {
      verificationToken.admin.emailVerified = true;
      await this.adminRepo.save(verificationToken.admin);
    } else if (verificationToken.traiteur) {
      verificationToken.traiteur.emailVerified = true;
      await this.traiteurRepo.save(verificationToken.traiteur);
    } else if (verificationToken.livreur) {
      verificationToken.livreur.emailVerified = true;
      await this.livreurRepo.save(verificationToken.livreur);
    } else if (verificationToken.fournisseur) {
      verificationToken.fournisseur.emailVerified = true;
      await this.fournisseurRepo.save(verificationToken.fournisseur);
    }

    return true;
  }
}