//commandes/entities/commande.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn, CreateDateColumn} from 'typeorm';
import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { Traiteur } from 'src/users/traiteur/entities/traiteur.entity';
import { Plat } from 'src/plat/entities/plat.entity';
import { Paiement } from 'src/paiement/entities/paiement.entity';
import { Livreur } from 'src/users/livreur/entities/livreur.entity';

export enum StatutCommande {
  EN_ATTENTE = 'En attente',
  EN_COURS = 'En cours',
  LIVRÉE = 'Livrée',
  ANNULÉE = 'Annulée',
}


@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dateCommande: Date;

  @Column({ type: 'enum', enum: StatutCommande, default: StatutCommande.EN_ATTENTE })
  statut: StatutCommande;

  @Column({ type: 'float' })
  montantTotal: number;

  // ➕ Plusieurs plats dans une commande
  @ManyToMany(() => Plat)
  @JoinTable()
  plats: Plat[];

  // 👤 Demandeur (utilisateur)
  @ManyToOne(() => Demandeur, { eager: true })
  demandeur: Demandeur;

  // 👨‍🍳 Traiteur responsable de la commande
  @ManyToOne(() => Traiteur, { eager: true })
  traiteur: Traiteur;

  // 💸 Paiement lié
  @OneToOne(() => Paiement, { cascade: true, eager: true })
  @JoinColumn()
  paiement: Paiement;

  // 🛵 Livreur qui effectue la livraison
  @ManyToOne(() => Livreur, { nullable: true, eager: true })
  livreur: Livreur;

  suivreCommande(): string {
    return `Commande ${this.id} suivie avec succès.`;
  }

   payerEnLigne(): string {
    return `Commande ${this.id} payée en ligne avec succès.`;
  }
}
