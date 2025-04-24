// src/fournisseur/entities/fournisseur.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class Fournisseur {

      @PrimaryGeneratedColumn()
          id: number;
        
          @Column({ nullable: true })
          nom: string;
        
          @Column({ nullable: true })
          email: string;
        
          @Column({ nullable: true })
          telephone: string;
        
          @Column({ nullable: true })
          motDePasse: string;
    
      @Column({ nullable: true })
      adresse: string;

      @Column({ nullable: true })
      entreprise: string;

      
      
            // Method to supply ingredients
            fournirIngredients(): string {
            return 'Ingrédients fournis avec succès.';
            }
      
            // Method to manage orders
            gérerCommandes(): string {
            return 'Commandes gérées avec succès.';
            }
      
}
