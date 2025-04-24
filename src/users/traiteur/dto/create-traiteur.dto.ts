//create-traiteur.dto.ts
import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateTraiteurDto {

  @IsString()
  nom: string;

  @IsString()
  email: string;

  @IsString()
  téléphone: string;

  @IsString()
  motDePasse: string;

  @IsNotEmpty()
  @IsString()
  spécialité: string;

  @IsNotEmpty()
  @IsString()
  zoneLivraison: string;

  @IsArray()
  listePlats: number[]; // We'll link with Plat IDs later
}
