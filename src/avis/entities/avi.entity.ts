//avis.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { Traiteur } from 'src/users/traiteur/entities/traiteur.entity';

@Entity()
export class Avis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  note: number;

  @Column()
  commentaire: string;

  @Column({ type: 'timestamp' })
  datePublication: Date;

  // Un avis est laissé par un seul Demandeur
  @ManyToOne(() => Demandeur, demandeur => demandeur.avisLaissés)
  demandeur: Demandeur;

  // Un avis est destiné à un seul Traiteur
  @ManyToOne(() => Traiteur, traiteur => traiteur.avisReçus)
  traiteur: Traiteur;
}
