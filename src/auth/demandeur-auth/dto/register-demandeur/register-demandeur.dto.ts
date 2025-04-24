import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDemandeurDto {
  @IsString() nom: string;
  @IsString() prenom: string;
  @IsEmail() email: string;
  @IsString() telephone: string;
  @IsString() @MinLength(6) motDePasse: string;
  @IsString() @IsOptional() adresse?: string;
}
