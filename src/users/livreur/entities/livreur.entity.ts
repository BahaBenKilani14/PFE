// src/users/livreur/entities/livreur.entity.ts
import { Entity, OneToMany, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Commande } from 'src/commande/entities/commande.entity';
import { Paiement } from 'src/paiement/entities/paiement.entity';


@Entity()
export class Livreur {

  @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ nullable: true })
      nom: string;
    
      @Column({ nullable: true })
      email: string;
    
      @Column({ nullable: true })
      téléphone: string;
    
      @Column({ nullable: true })
      motDePasse: string;
    
  
  

  @Column({ nullable: true })
  zoneLivraison: string;

  @Column({ default: true })
  disponible: boolean;

  emailVerified: boolean;

  // One Livreur can deliver many commandes
  @OneToMany(() => Commande, (commande) => commande.livreur)
  commandesLivrées: Commande[];

  // One Livreur can follow multiple payments
  @OneToMany(() => Paiement, (paiement) => paiement.livreur)
  paiements: Paiement[];


  // Method to deliver a command
  livrerCommande(): string {
    return 'Commande livrée avec succès.';
  }

  // Method to follow a payment
  suivrePaiement(): string {
    return 'Paiement suivi avec succès.';
  }
}
