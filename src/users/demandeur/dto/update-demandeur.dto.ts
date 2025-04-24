import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class UpdateDemandeurDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  adress?: string;

  @IsOptional()
  @IsString()
  préférenceAlimentaire?: string;

  @IsOptional()
  @IsString()
  motDePasse?: string;
}
