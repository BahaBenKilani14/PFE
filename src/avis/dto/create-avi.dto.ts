//create-avi.dto.ts
import { IsInt, IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAvisDto {
  @IsInt()
  note: number;

  @IsString()
  @IsNotEmpty()
  commentaire: string;

  @IsDateString()
  datePublication: string; // format ISO (ex : '2025-04-14T10:30:00Z')

  @IsInt()
  demandeurId: number;

  @IsInt()
  traiteurId: number;
}
