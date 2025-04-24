import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDemandeurDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  motDePasse: string;
}
