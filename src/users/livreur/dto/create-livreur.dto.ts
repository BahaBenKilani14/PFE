// src/users/livreur/dto/create-livreur.dto.ts
import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';

export class CreateLivreurDto {
  @IsString()
  nom: string;

  @IsEmail()
  email: string;

  @IsString()
  téléphone: string;

  @IsString()
  motDePasse: string;
  
  @IsString()
  @IsOptional()
  zoneLivraison?: string;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
}
