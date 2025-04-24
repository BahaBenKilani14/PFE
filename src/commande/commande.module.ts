import { Module }           from '@nestjs/common';
import { TypeOrmModule }    from '@nestjs/typeorm';
import { CommandeService }  from './commande.service';
import { CommandeController } from './commande.controller';
import { Commande }         from './entities/commande.entity';
import { Paiement }         from 'src/paiement/entities/paiement.entity';
import { Plat }             from 'src/plat/entities/plat.entity';
import { Demandeur }        from 'src/users/demandeur/entities/demandeur.entity';
import { Traiteur }         from 'src/users/traiteur/entities/traiteur.entity';
import { Livreur }          from 'src/users/livreur/entities/livreur.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Commande,
      Paiement,
      Plat,
      Demandeur,
      Traiteur,
      Livreur,
    ]),
  ],
  controllers: [CommandeController],
  providers:    [CommandeService],
})
export class CommandeModule {}
