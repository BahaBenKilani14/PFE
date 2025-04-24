import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Demandeur } from 'src/users/demandeur/entities/demandeur.entity';
import { Admin } from 'src/users/admin/entities/admin.entity';
import { Traiteur } from 'src/users/traiteur/entities/traiteur.entity';
import { Livreur } from 'src/users/livreur/entities/livreur.entity';
import { Fournisseur } from 'src/users/fournisseur/entities/fournisseur.entity';

@Entity()
export class VerificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => Demandeur)
  demandeur: Demandeur;

  @ManyToOne(() => Admin)
  admin: Admin;

  @ManyToOne(() => Traiteur)
  traiteur: Traiteur;

  @ManyToOne(() => Livreur)
  livreur: Livreur;

  @ManyToOne(() => Fournisseur)
  fournisseur: Fournisseur;

  @Column({ type: 'varchar', nullable: true })
  userType: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date;
}
