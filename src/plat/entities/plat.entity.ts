//plat.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { Traiteur } from 'src/users/traiteur/entities/traiteur.entity';

@Entity()
export class Plat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  prix: number;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  disponible: boolean;

  @ManyToMany(() => Traiteur, (traiteur) => traiteur.listePlats)
  traiteurs: Traiteur[];

}