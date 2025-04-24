//commande.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @Post('create-commande') //dfgf
  create(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandeService.create(createCommandeDto);
  }

  @Get('list-commande')//dgfgh
  findAll() {
    return this.commandeService.findAll();
  }

  @Get('commande/:id')//gt
  findOne(@Param('id') id: string) {
    return this.commandeService.findOne(+id);
  }

  @Patch('update-commande/:id')//hdrhfy
  update(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDto) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete('delete-commande/:id')//gdghfgh
  remove(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }
}
