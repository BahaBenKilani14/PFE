//create-commande.dto.ts
import { IsNotEmpty, IsArray, IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Plat } from 'src/plat/entities/plat.entity';
import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { Traiteur } from 'src/users/traiteur/entities/traiteur.entity';
import { Paiement } from 'src/paiement/entities/paiement.entity';
import { Livreur } from 'src/users/livreur/entities/livreur.entity';

export class CreateCommandeDto {
  @IsNotEmpty()
  @IsArray()
  @Type(() => Plat)
  plats: Plat[];

  @IsNotEmpty()
  @Type(() => Demandeur)
  demandeur: Demandeur;

  @IsNotEmpty()
  @Type(() => Traiteur)
  traiteur: Traiteur;

  @IsNotEmpty()
  @IsNumber()
  montantTotal: number;

  @IsOptional()
  @IsString()
  statut?: string;

  @IsNotEmpty()
  @Type(() => Paiement)
  paiement: Paiement;

  @IsOptional()
  @Type(() => Livreur)
  livreur?: Livreur;
}
