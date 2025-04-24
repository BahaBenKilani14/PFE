//admin update dto
import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsString, IsOptional } from 'class-validator';


export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    
    @IsOptional()
    @IsString()
      address?: string;
    
}
