//create-fournisseur.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, MinLength, IsString } from 'class-validator';

export class CreateFournisseurDto {
  @IsString()
  nom: string;

  @IsEmail()
  email: string;

  @IsString()
  telephone: string;

  @IsString()
  @MinLength(6)
  motDePasse: string;


  @IsOptional()
  @IsString()
  entreprise?: string;
}
