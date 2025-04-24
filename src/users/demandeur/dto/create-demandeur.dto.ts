import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateDemandeurDto {
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  telephone: string;

  @IsString()
  motDePasse: string;

  @IsOptional()
  @IsString()
  adress?: string;

  @IsOptional()
  @IsString()
  préférenceAlimentaire?: string;
}
