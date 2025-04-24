//paiement.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';

@Controller('paiement')
export class PaiementController {
  constructor(private readonly paiementService: PaiementService) {}

  // Create a new payment
  @Post()
  create(@Body() createPaiementDto: CreatePaiementDto) {
    return this.paiementService.create(createPaiementDto);
  }

  // Get all payments
  @Get()
  findAll() {
    return this.paiementService.findAll();
  }

  // Get a specific payment by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paiementService.findOne(+id); // Convert string to number
  }

  // Update a payment by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaiementDto: UpdatePaiementDto) {
    return this.paiementService.update(+id, updatePaiementDto); // Convert string to number
  }

  // Delete a payment by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paiementService.remove(+id); // Convert string to number
  }
}
