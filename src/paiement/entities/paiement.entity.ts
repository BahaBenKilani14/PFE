//paiement.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Commande } from 'src/commande/entities/commande.entity';
import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { Livreur } from 'src/users/livreur/entities/livreur.entity';

@Entity()
export class Paiement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  montant: number;

  @Column()
  datePaiement: Date;

  @Column({ default: 'en attente' })
  statut: string;  // "en attente", "payé", "annulé", etc.

  @ManyToOne(() => Demandeur, (demandeur) => demandeur.paiements)
  @JoinColumn()
  demandeur: Demandeur;

  @OneToOne(() => Commande, (commande) => commande.paiement)
  @JoinColumn()
  commande: Commande;

  @ManyToOne(() => Livreur, (livreur) => livreur.paiements)
  @JoinColumn({ name: 'livreurId' })
  livreur: Livreur;
  
  // Optionally, you could include payment methods such as card type or bank details if needed
  @Column({ nullable: true })
  moyenPaiement?: string; // E.g., "Carte", "Virement", "Cash"
}
