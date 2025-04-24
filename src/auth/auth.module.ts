// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { DemandeurAuthService } from './demandeur-auth/demandeur-auth.service';
import { DemandeurAuthController } from './demandeur-auth/demandeur-auth.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([Demandeur]),
    JwtModule.register({ secret: 'yourSecretKey', signOptions: { expiresIn: '1h' } }),
  ],
  providers: [DemandeurAuthService],
  controllers: [DemandeurAuthController],
})
export class AuthModule {}
