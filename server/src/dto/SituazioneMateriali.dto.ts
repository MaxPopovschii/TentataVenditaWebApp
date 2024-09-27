import { Expose } from 'class-transformer';
import {
  IsBooleanString,
  IsNotEmpty,
  IsString,
  isBooleanString,
} from 'class-validator';

export class SituazioneMaterialiBasic {
  @Expose() articolo: string;
  @Expose() descrizione_articolo: string;
  @Expose() matricola_fornitore: string;
  @Expose() matricola_interna: string;
  @Expose() destinazione_diversa: string;
  @Expose() nr_doc_consegna: number;
  @Expose() alfa_doc_consegna: string;
  @Expose() data_doc_consegna: Date;
  @Expose() giorniUtilizzoInUso: Date;
  @Expose() giorniUtilizzoRitirati: Date;
  @Expose() tipo_conto: string;
  @Expose() codice_cliente: string;
  @Expose() ragione_sociale: string;
  @Expose() data_fine_contratto: Date;
  @Expose() codice_agente: string;
  @Expose() importo_acquisto: number;
  @Expose() In_Uso: string;
  @Expose() NRO_CONTRATTO: number;
  @Expose() DDNOMDES: string;
  @Expose() DDINDIRI: string;
  @Expose() DD___CAP: string;
  @Expose() DDLOCALI: string;
  @Expose() DDPROVIN: string;
}

export class SituazioneMaterialiFilters {
  @IsNotEmpty()
  @IsString()
  @Expose()
  ragione_sociale: string;
  @IsString()
  @IsNotEmpty()
  @Expose()
  In_Uso: string;
}

export class SituazioneMaterialiView {
  @Expose() articolo: string;
  @Expose() descrizione_articolo: string;
  @Expose() matricola_fornitore: string;
  @Expose() matricola_interna: string;
  @Expose() giorniUtilizzoInUso: number;
  @Expose() importo_acquisto: number;
  @Expose() nr_doc_consegna: number;
  @Expose() alfa_doc_consegna: string;
  @Expose() data_doc_consegna: Date;
  @Expose() In_Uso: string;
  @Expose() ragione_sociale: string;
}
