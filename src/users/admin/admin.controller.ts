//admin.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins') 
export class AdminController {
  constructor(private readonly AdminrService: AdminService) {}

  @Post('create-admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.AdminrService.create(createAdminDto);
  }

  @Get('list-admin')
  findAll() {
    return this.AdminrService.findAll();
  }

  @Get('list-admin/:id')
  findOne(@Param('id') id: string) {
    return this.AdminrService.findOne(+id);
  }

  @Patch('update-admin/:id')
  update(@Param('id') id: string, @Body() UpdateAdminDto: UpdateAdminDto) {
    return this.AdminrService.update(+id, UpdateAdminDto);
  }

  @Delete('delete-admin/:id')
  remove(@Param('id') id: string) {
    return this.AdminrService.remove(+id);
  }
}
