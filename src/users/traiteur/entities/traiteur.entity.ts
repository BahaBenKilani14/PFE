//traiteur.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Plat } from 'src/plat/entities/plat.entity';
import { Avis } from 'src/avis/entities/avi.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class Traiteur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nom: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  spécialité: string;

  @Column({ nullable: true })
  zoneLivraison: string;

  emailVerified: boolean;

  // Establishing a Many-to-Many relationship with Plat
  @ManyToMany(() => Plat)
  @JoinTable()  // This decorator creates the join table that manages the many-to-many relationship
  listePlats: Plat[];

  @Column()
  motDePasse: string;

  @OneToMany(() => Avis, avis => avis.traiteur)
  avisReçus: Avis[];



}
