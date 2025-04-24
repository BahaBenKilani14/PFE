// src/auth/demandeur-auth/demandeur-auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { DemandeurAuthService } from './demandeur-auth.service';
import { RegisterDemandeurDto } from './dto/register-demandeur/register-demandeur.dto';
import { LoginDemandeurDto } from './dto/login-demandeur/login-demandeur.dto';

@Controller('auth/demandeur')
export class DemandeurAuthController {
  constructor(private readonly auth: DemandeurAuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDemandeurDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDemandeurDto) {
    return this.auth.login(dto);
  }
}
