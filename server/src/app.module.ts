/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ContiController } from './controller/conti.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import ConfigInterface from './config/ConfigInterface';
import allEntities from './allEntities';
import { ScontiContrattiController } from './controller/sconti-contratti.controller';
import { TestController } from './test.controller';
import { ArticoliController } from './controller/articoli.controller';
import { ScontiMaturatiController } from './controller/sconti-maturati.controller';
import { ScontiModelliController } from './controller/sconti-modelli.controller';
import { GruppoMerceologicoController } from './controller/gruppo-merceologico.controller';
import { TipologieInterventoController } from './controller/tipologie-intervento.controller';
import { AttrezzatureController } from './controller/attrezzature.controller';
import { MatricoleController } from './controller/matricole.controller';
import { InterventiMasterController } from './controller/interventi-master.controller';
import { DocController } from './controller/doc.controller';
import { ComodatoContrattiController } from './controller/comodato-contratti.controller';
import { KeyArtController } from './controller/key-art.controller';

import { MagazzinoController } from './controller/magazzino.controller';
import { ListaInterventiController } from './controller/lista-interventi.controller';
import { MaturazioniController } from './controller/maturazioni.controller';
import { AllegatiController } from './controller/allegati.controller';
import { AgentiController } from './controller/agenti.controller';
import { ClientiController } from './controller/clienti.controller';
import { ConsumometrController } from './controller/consumometr.controller';
import { MopDettController } from './controller/mop-dett.controller';
import { MaterialiDocTuttiController } from './controller/materialidoctutti.controller';
import { SituazioneMaterialiController } from './controller/situazionemateriali.controller';
import { ListiniController } from './controller/listini.controler';
import { TecniciController } from './controller/tecnici.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<ConfigInterface>) => {
        return {
          type: 'mssql',
          host: config.get('database.host', { infer: true }),
          port: config.get('database.port', { infer: true }),
          username: config.get('database.username', { infer: true }),
          password: config.get('database.password', { infer: true }),
          database: config.get('database.name', { infer: true }),
          entities: allEntities,
          logging: ['query'],
          autoLoadEntities: true,
          synchronize: false,
          options: { encrypt: false },
          entityPrefix: config.get('database.entityPrefix', { infer: true }),
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [
        '.env.development.local',
        '.env.development',
        '.env.local',
        '.env',
      ],
    }),
  ],
  controllers: [
    ContiController,
    ArticoliController,
    ScontiModelliController,
    ScontiContrattiController,
    ScontiMaturatiController,
    TestController,
    GruppoMerceologicoController,
    TipologieInterventoController,
    AttrezzatureController,
    MatricoleController,
    InterventiMasterController,
    DocController,
    ComodatoContrattiController,
    KeyArtController,
    MagazzinoController,
    ListaInterventiController,
    MaturazioniController,
    AllegatiController,
    AgentiController,
    ClientiController,
    ConsumometrController,
    MopDettController,
    MaterialiDocTuttiController,
    SituazioneMaterialiController,
    ListiniController,
    TecniciController,
  ],
  providers: [AppService],
})
export class AppModule {}
