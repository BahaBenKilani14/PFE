//update-avi.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAvisDto } from './create-avi.dto';

export class UpdateAvisDto extends PartialType(CreateAvisDto) {}
