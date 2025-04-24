//demandeur.entity.ts
import { Entity, Column, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Commande } from 'src/commande/entities/commande.entity';
import { Avis } from 'src/avis/entities/avi.entity';
import { Paiement } from 'src/paiement/entities/paiement.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DemandeurProperties } from './demandeur.docs';

@Entity()
export class Demandeur {
  @ApiProperty(DemandeurProperties.id)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty(DemandeurProperties.nom)
  @Column({ nullable: true })
  nom: string;

  @ApiProperty(DemandeurProperties.prenom)
  @Column({ nullable: true })
  prenom: string;

  @ApiProperty(DemandeurProperties.email)
  @Column({ nullable: true, unique: true })  // Ensure email is unique
  email: string;

  @ApiProperty(DemandeurProperties.telephone)
  @Column({ nullable: true })
  telephone: string;

  @ApiProperty(DemandeurProperties.motDePasse)
  @Column({ nullable: true })
  motDePasse: string;

  @ApiProperty(DemandeurProperties.adress)
  @Column({ nullable: true })
  adress: string;

  @ApiProperty(DemandeurProperties.préférenceAlimentaire)
  @Column({ nullable: true })
  préférenceAlimentaire: string;

  // One Demandeur can make many commandes
  @ApiProperty(DemandeurProperties.commandes)
  @OneToMany(() => Commande, (commande) => commande.demandeur)
  commandes: Commande[];

  // One Demandeur can leave many avis
  @ApiProperty(DemandeurProperties.avisLaissés)
  @OneToMany(() => Avis, (avis) => avis.demandeur)
  avisLaissés: Avis[];

  // One Demandeur can make many paiements
  @ApiProperty(DemandeurProperties.paiements)
  @OneToMany(() => Paiement, (paiement) => paiement.demandeur)
  paiements: Paiement[];
}

