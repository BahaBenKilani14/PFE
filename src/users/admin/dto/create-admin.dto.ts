//admin.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsString, minLength } from 'class-validator';

export class CreateAdminDto {
    @IsString()
    nom: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    téléphone: string;
  
    @IsString()
    @MinLength(6)
    motDePasse: string;
  
}
