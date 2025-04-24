// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { Admin } from 'src/users/admin/entities/admin.entity';
import { Traiteur } from 'src/users/traiteur/entities/traiteur.entity';
import { Livreur } from 'src/users/livreur/entities/livreur.entity';
import { Fournisseur } from 'src/users/fournisseur/entities/fournisseur.entity';
import { VerificationToken } from './verification-token.entity';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([
      Demandeur,
      Admin,
      Traiteur,
      Livreur,
      Fournisseur,
      VerificationToken,
    ]),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
