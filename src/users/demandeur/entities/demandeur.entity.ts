//demandeur.entity.ts
import { Entity, Column, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Commande } from 'src/commande/entities/commande.entity';
import { Avis } from 'src/avis/entities/avi.entity';
import { Paiement } from 'src/paiement/entities/paiement.entity';


@Entity()
export class Demandeur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nom: string;

  @Column({ nullable: true })
  prenom: string;

  @Column({ nullable: true, unique: true })  // Ensure email is unique
  email: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  motDePasse: string;

  @Column({ nullable: true })
  adress: string;

  @Column({ nullable: true })
  préférenceAlimentaire: string;

  // One Demandeur can make many commandes
  @OneToMany(() => Commande, (commande) => commande.demandeur)
  commandes: Commande[];

  // One Demandeur can leave many avis
  @OneToMany(() => Avis, (avis) => avis.demandeur)
  avisLaissés: Avis[];

  // One Demandeur can make many paiements
  @OneToMany(() => Paiement, (paiement) => paiement.demandeur)
  paiements: Paiement[];
}

