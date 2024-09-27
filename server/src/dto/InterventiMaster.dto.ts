import { ContiBasicGet } from './Conti.dto';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { ArticoliView } from './ArtIcol.dto';

export class InterventiMasterFilter {
  @Type(() => String)
  @IsString()
  @IsOptional()
  tipoAttrezzatura?: string;
  @Type(() => String)
  @IsString()
  @IsOptional()
  idCliente?: string;
  @Type(() => String)
  @IsString()
  @IsOptional()
  idArticolo?: string;
  @Type(() => String)
  @IsString()
  @IsOptional()
  idMatricola?: string;
}

export class InterventiMastBasic {
  @Expose() ID: number;
  @Expose() numero: number | null;
  @Expose() dataInserimento: Date | null;
  @Expose() dataEsecuzione: Date | null;
  @Expose() internoEsterno: string | null;
  @Expose() tecnico: string | null;
  @Expose() utcc: number | null;
  @Expose() utcv: number | null;
  @Expose() utdc: Date | null;
  @Expose() utdv: Date | null;
  @Expose() tipoRichiesta: string | null;
  @Expose() idCliente: string | null;
  @Expose() codiceArticolo: string | null;
  @Expose() idMatricola: string | null;
  @Expose() barcode: string | null;
  @Expose() descrizione: string | null;
  @Expose() note: string | null;
  @Expose() idFornitore: string | null;
  @Expose() nrDocFor: string | null;
  @Expose() dataDocFor: Date | null;
  @Expose() codiceMagazzino: string | null;
  @Expose() serialeDoc: string | null;
  @Expose() matricolaFornitore: string | null;
  @Expose()
  idDestinazione: string | null;
}

export class InterventiMastBasicEdit extends InterventiMastBasic {
  @Type(() => InterventiDettEdit)
  @Expose()
  dettagli: InterventiDettEdit[];
}

export class InterventiMastView extends InterventiMastBasic {
  @Expose() codiceMatricola: string;
  @Type(() => ContiBasicGet)
  @Expose()
  conto: ContiBasicGet | null;
  @Expose()
  @Type(() => ArticoliView)
  articolo: ArticoliView | null;
  @Expose()
  fornitore: ContiBasicGet | null;
  @Expose()
  ardesart: string | null;
}

export class InterventiDettEdit {
  @Expose() ID: string;
  @Expose() idIntervento: number;
  @Expose() idTipoIntervento: string;
  @Expose() riga: number;
  @Expose() codiceTipoAttrezzatura: string | null;
  @Expose() note: string | null;
  @Expose() codiceMagazzino: string | null;
  @Expose() codiceServizio: string | null;
  @Expose() qta: number | null;
  @Expose() prezzo: number | null;
  @Expose() netto: number | null;
  @Expose() utdc: Date | null;
  @Expose() utdv: Date | null;
}

export class InterventiMasterEdit {
  @IsObject()
  @Type(() => InterventiMastBasic)
  contratto: InterventiMastBasic;

  @IsArray()
  @Type(() => InterventiDettEdit)
  dettagli: InterventiDettEdit[];
}

export class SerchDettagliById {
  @IsString()
  ID: string;
}
