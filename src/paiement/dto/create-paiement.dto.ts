//create-paiement.dto.ts
import { IsNotEmpty, IsNumber, IsDate, IsOptional, IsString } from 'class-validator';

export class CreatePaiementDto {
  @IsNumber()
  @IsNotEmpty()
  montant: number;

  @IsDate()
  @IsNotEmpty()
  datePaiement: Date;

  @IsString()
  @IsOptional()
  statut?: string; // "en attente", "payé", "annulé", etc.

  @IsString()
  @IsOptional()
  moyenPaiement?: string; // "Carte", "Virement", etc.

  @IsNotEmpty()
  demandeurId: number; // ID du demandeur qui effectue le paiement

  @IsNotEmpty()
  commandeId: number; // ID de la commande pour laquelle le paiement a été effectué
}
