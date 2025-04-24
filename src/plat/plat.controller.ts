//plat.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatService } from './plat.service';
import { CreatePlatDto } from './dto/create-plat.dto';
import { UpdatePlatDto } from './dto/update-plat.dto';

@Controller('plat')
export class PlatController {
  constructor(private readonly platService: PlatService) {}

  @Post('create-plats')
  create(@Body() createPlatDto: CreatePlatDto) {
    return this.platService.create(createPlatDto);
  }

  @Get('list-plats')
  findAll() {
    return this.platService.findAll();
  }

  @Get('list-plats/:id')
  findOne(@Param('id') id: string) {
    return this.platService.findOne(+id);
  }

  @Patch('update-plat/:id')
  update(@Param('id') id: string, @Body() updatePlatDto: UpdatePlatDto) {
    return this.platService.update(+id, updatePlatDto);
  }

  @Delete('delete-plats/:id')
  remove(@Param('id') id: string) {
    return this.platService.remove(+id);
  }
}
