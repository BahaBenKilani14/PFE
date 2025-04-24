//update-fournisseur.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateFournisseurDto } from './create-fournisseur.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFournisseurDto extends PartialType(CreateFournisseurDto) {
    @IsOptional()
    @IsString()
        address?: string;
}
