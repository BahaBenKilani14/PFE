// src/admin/entities/admin.entity.ts
import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin  {

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
    adresse: string;

}
