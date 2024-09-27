import { ContiBasicGet } from './Conti.dto';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ArticoliView } from './ArtIcol.dto';

export class ScontiContrattiFilter {
  @Type(() => String)
  @IsString()
  @IsOptional()
  codiceModello?: string;
  @Transform((str) => {
    if (str.value === 'false') return false;
    if (str.value === 'true') return true;
    if (str.value === undefined) return undefined;
    return 'INVALID';
  })
  @IsBoolean()
  @IsOptional()
  alsoClosed?: boolean;
}

export class ScontiContrattiMastBasic {
  @Expose() @IsString() ID: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataContratto: Date | null;

  @Expose() @IsString() @IsOptional() descrizione: string | null;
  @Expose() @IsString() @IsOptional() note: string | null;
  @Expose() @IsString() @IsOptional() codiceModello: string | null;
  @Expose() @IsString() @IsOptional() idCliente: string | null;
  @Expose() @IsString() @IsOptional() idDestinazione: string | null;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataInizioValidita: Date | null;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataFineValidita: Date | null;

  @Expose() @IsNumber() @IsOptional() importoScontareMax: number | null;
  @Expose() @IsNumber() @IsOptional() importoScontareErogato: number | null;
  @Expose() @IsNumber() @IsOptional() importoScontareResiduo: number | null;
  @Expose() @IsNumber() @IsOptional() mesiDurataContratto: number | null;
  @Expose() @IsNumber() @IsOptional() qtaSogliaMinima: number | null;
  @Expose() @IsDate() @Type(() => Date) @IsOptional() dataChiusura: Date | null;
  @Expose() @IsString() @IsOptional() motivoChiusura: string | null;
  @Expose() @IsNumber() @IsOptional() kgMinimoSettimana: number | null;
  @Expose() @IsNumber() @IsOptional() kgMinimoMese: number | null;
  @Expose() @IsNumber() @IsOptional() kgMinimoAnno: number | null;
  @Expose() @IsNumber() @IsOptional() totQtaOmaggiata: number | null;
  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataUltimaElaborazione: Date | null;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataEsaurimentoPrevista: Date | null;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataEsaurimentoEffettiva: Date | null;

  @Expose() @IsDate() @Type(() => Date) @IsOptional() utdc: Date | null;
  @Expose() @IsDate() @Type(() => Date) @IsOptional() utdv: Date | null;
}

export class ScontiContrattiMastBasicLookup extends ScontiContrattiMastBasic {
  @Expose() humanReadableID: string;
}

export class ScontiContrattiMastEdit extends ScontiContrattiMastBasic {
  @Type(() => ScontiContrattiDettEdit)
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  dettagli: ScontiContrattiDettEdit[];
}

export class ScontiContrattiMastView extends ScontiContrattiMastBasic {
  @Type(() => ContiBasicGet)
  @Expose()
  conto: ContiBasicGet | null;
}

export class ScontiContrattiDettEdit {
  @Expose() @IsString() ID: string;
  @Expose() @IsString() @IsOptional() codiceArticolo: string | null;
  @Expose() @IsString() @IsOptional() codiceGruppoMerc: string | null;
  @Expose() @IsNumber() @IsOptional() percScontare: number | null;
  @Expose() @IsNumber() @IsOptional() qtaSogliaMinima: number | null;
  @Expose() @IsNumber() @IsOptional() qtaOmaggiare: number | null;
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dataInizioValidita: Date | null;
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dataFineValidita: Date | null;
  @Expose() @IsNumber() @IsOptional() kgMinimoSettimana: number | null;
  @Expose() @IsNumber() @IsOptional() kgMinimoMese: number | null;
  @Expose() @IsNumber() @IsOptional() kgMinimoAnno: number | null;
  @Expose() @IsNumber() @IsOptional() totImportoScontato: number | null;
  @Expose() @IsNumber() @IsOptional() totQtaScontata: number | null;
  @Expose() @IsOptional() dataUltimaElaborazione: Date | null;
}

export class ScontiContrattiDettView extends ScontiContrattiDettEdit {
  @Type(() => ArticoliView)
  @Expose()
  articolo: ArticoliView | null;

  @Expose() humanReadableID: string;
}

export class ScontiContrattiEdit {
  @IsObject()
  @Type(() => ScontiContrattiMastBasic)
  @ValidateNested()
  contratto: ScontiContrattiMastBasic;

  @IsArray()
  @Type(() => ScontiContrattiDettEdit)
  @ValidateNested()
  dettagli: ScontiContrattiDettEdit[];
}

export class SearchContrattiByConto {
  @IsString()
  ID: string;
}

export class SerchDettagliById {
  @IsString()
  ID: string;
}
