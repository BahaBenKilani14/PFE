import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandeModule } from './commande/commande.module';
import { DemandeurModule } from './users/demandeur/demandeur.module';
import { AdminModule } from './users/admin/admin.module';
import { PlatModule } from './plat/plat.module';
import { PaiementModule } from './paiement/paiement.module';
import { AvisModule } from './avis/avis.module';
import { AuthModule } from './auth/auth.module';
import { LivreurModule } from './users/livreur/livreur.module';
import { TraiteurModule } from './users/traiteur/traiteur.module';
import { FournisseurModule } from './users/fournisseur/fournisseur.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
      useFactory: () => ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'PFE',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      }),
    }),
    DemandeurModule,
    CommandeModule,
    AdminModule,
    PlatModule,
    PaiementModule,
    AvisModule,
    AuthModule,
    LivreurModule,
    TraiteurModule,
    FournisseurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
