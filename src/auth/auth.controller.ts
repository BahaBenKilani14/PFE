import { Controller, Post, Body, Query, Get, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// Pour valider le token de verifyEmail
class VerifyEmailQueryDto {
  @IsString()
  token: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login (loginDto.email, loginDto.motDePasse);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    description: 'Provide role-specific DTO (DemandeurDto | TraiteurDto | FournisseurDto | LivreurDto | AdminDto)',
    schema: { type: 'object' }, // comme tu as des DTO dynamiques selon le rôle
  })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async register(@Body() payload: any): Promise<any> {
    return this.authService.register(payload);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verify email with token' })
  @ApiResponse({ status: 200, description: 'Email successfully verified.' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token.' })
  async verifyEmail(@Query() query: VerifyEmailQueryDto): Promise<{ message: string }> {
    const verified = await this.authService.verifyEmail(query.token);
    if (verified) {
      return { message: 'Email verified successfully' };
    } else {
      throw new BadRequestException('Invalid or expired verification token');
    }
  }
}
