import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDemandeurDto {
  @ApiProperty({ description: 'First name of the user', example: 'Jean' })
  @IsString()
  nom: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Dupont' })
  @IsString()
  prenom: string;

  @ApiProperty({ description: 'Email address', example: 'jean.dupont@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number with country code', example: '+33612345678' })
  @IsPhoneNumber()
  telephone: string;

  @ApiProperty({ description: 'User password', example: 'SecurePassword123!' })
  @IsString()
  motDePasse: string;

  @ApiProperty({ description: 'User address', required: false, example: '123 Avenue de Paris, Paris' })
  @IsOptional()
  @IsString()
  adress?: string;

  @ApiProperty({ description: 'Food preference', required: false, example: 'Végétarien' })
  @IsOptional()
  @IsString()
  préférenceAlimentaire?: string;
}
