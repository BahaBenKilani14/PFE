import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nom: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  motDePasse: string;

  @IsNotEmpty()
  tel: string;

  @IsOptional()
  abonnementId?: number; // Make sure it's optional or required depending on your logic
}
