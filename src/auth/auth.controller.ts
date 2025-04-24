// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateDemandeurDto } from 'src/users/demandeur/dto/create-demandeur.dto';
import { JwtAuthGuard } from './gurads/jwt.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register/demandeur')
  @ApiOperation({ summary: 'Register a new demandeur' })
  @ApiBody({ type: CreateDemandeurDto })
  @ApiResponse({ status: 201, description: 'Demandeur successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async registerDemandeur(@Body() createDemandeurDto: CreateDemandeurDto) {
    return this.authService.registerDemandeur(createDemandeurDto);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verify email with token' })
  @ApiResponse({ status: 200, description: 'Email successfully verified.' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token.' })
  async verifyEmail(@Query('token') token: string) {
    const verified = await this.authService.verifyEmail(token);
    if (verified) {
      return { message: 'Email verified successfully' };
    } else {
      return { message: 'Invalid or expired verification token' };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile (protected route)' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getProfile() {
    return { message: 'Protected route - profile access' };
  }
}
