//update-traiteur.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { CreateTraiteurDto } from './create-traiteur.dto';

export class UpdateTraiteurDto extends PartialType(CreateTraiteurDto) {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  listePlatsIds?: number[];
}