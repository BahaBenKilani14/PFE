import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { Admin } from 'src/users/admin/entities/admin.entity';
import { Traiteur } from 'src/users/traiteur/entities/traiteur.entity';
import { Livreur } from 'src/users/livreur/entities/livreur.entity';
import { Fournisseur } from 'src/users/fournisseur/entities/fournisseur.entity';
import { VerificationToken } from './verification-token.entity';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,


    @InjectRepository(Demandeur)
    private demandeurRepo: Repository<Demandeur>,

    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,

    @InjectRepository(Traiteur)
    private traiteurRepo: Repository<Traiteur>,

    @InjectRepository(Livreur)
    private livreurRepo: Repository<Livreur>,

    @InjectRepository(Fournisseur)
    private fournisseurRepo: Repository<Fournisseur>,

    @InjectRepository(VerificationToken)
    private verificationTokenRepo: Repository<VerificationToken>,
  ) {}

  // Hash the password before saving
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // Validate the user's email and password (hashing comparison)
  async validateUser(email: string, motDePasse: string) {
    const entities = [
      { repo: this.demandeurRepo, role: 'demandeur' },
      { repo: this.adminRepo, role: 'admin' },
      { repo: this.traiteurRepo, role: 'traiteur' },
      { repo: this.livreurRepo, role: 'livreur' },
      { repo: this.fournisseurRepo, role: 'fournisseur' },
    ];

    for (const entity of entities) {
      const user = await entity.repo.findOne({ where: { email } });
      if (user) {
        // Compare hashed password with the provided plain text password
        const passwordMatch = await bcrypt.compare(
          motDePasse,
          user.motDePasse,
        );
        if (passwordMatch) {
          return { id: user.id, email: user.email, role: entity.role };
        }
      }
    }

    throw new UnauthorizedException('Invalid email or password');
  }

  // Handle login and return JWT token
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(
      loginDto.email,
      loginDto.motDePasse,
    );

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Register a user with hashed password and send verification email
  async registerDemandeur(demandeurDto: any) {
    const hashedPassword = await this.hashPassword(demandeurDto.motDePasse);
    const newDemandeur = this.demandeurRepo.create({
      ...demandeurDto,
      motDePasse: hashedPassword,
    });
    await this.demandeurRepo.save(newDemandeur);

    await this.sendVerificationEmail(newDemandeur, 'demandeur');

    return newDemandeur;
  }

  // Send the email verification token
  async sendVerificationEmail(user: any, userType: string) {
    const token = this.jwtService.sign(
      { userId: user.id, userType },
      { expiresIn: '1h' },
    ); // Token with expiration

    const verificationToken = this.verificationTokenRepo.create({
      token,
      userType,
      createdAt: new Date(),
    });
    
    // Set the correct user entity based on userType
    switch (userType) {
      case 'demandeur':
        verificationToken.demandeur = user;
        break;
      case 'admin':
        verificationToken.admin = user;
        break;
      case 'traiteur':
        verificationToken.traiteur = user;
        break;
      case 'livreur':
        verificationToken.livreur = user;
        break;
      case 'fournisseur':
        verificationToken.fournisseur = user;
        break;
    }
    
    await this.verificationTokenRepo.save(verificationToken);

    // Send the email with the verification token

  }

  // Verify the email with the token
  async verifyEmail(token: string): Promise<boolean> {
    const verificationToken = await this.verificationTokenRepo.findOne({
      where: { token },
      relations: [
        'demandeur',
        'admin',
        'traiteur',
        'livreur',
        'fournisseur',
      ],
    });
    
    if (verificationToken && !verificationToken.verifiedAt) {
      verificationToken.verifiedAt = new Date();
      await this.verificationTokenRepo.save(verificationToken);

      let user;
      let repo;

      switch (verificationToken.userType) {
        case 'demandeur':
          user = verificationToken.demandeur;
          repo = this.demandeurRepo;
          break;
        case 'admin':
          user = verificationToken.admin;
          repo = this.adminRepo;
          break;
        case 'traiteur':
          user = verificationToken.traiteur;
          repo = this.traiteurRepo;
          break;
        case 'livreur':
          user = verificationToken.livreur;
          repo = this.livreurRepo;
          break;
        case 'fournisseur':
          user = verificationToken.fournisseur;
          repo = this.fournisseurRepo;
          break;
      }

      if (user) {
        user.isEmailVerified = true;
        await repo.save(user);
        return true;
      }
    }

    return false;
  }
}
