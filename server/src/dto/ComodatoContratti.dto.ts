import { ContiBasicGet } from './Conti.dto';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ArticoliView } from './ArtIcol.dto';

export class ComodatoContrattiFilter {
  @Type(() => String)
  @IsString()
  @IsOptional()
  idCliente?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  idDestinazione?: string;
  @Type(() => String)
  @IsString()
  @IsOptional()
  idMatricola?: string;
  @IsString()
  @IsOptional()
  codiceArticolo?: string;

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

export class ComodatoContrattiMastBasic {
  @Expose() ID: number;
  @Expose() numero: number;
  @Expose() dataContratto: Date | null;
  @Expose() dataAttivazioneContratto: Date | null;
  @Expose() dataChiusuraContratto: Date | null;
  @Expose() idCliente: string | null;
  @Expose() idDestinazione: string | null;
  @Expose() consegnaNroPratica: string | null;
  @Expose() consegnaSerialDoc: string | null;
  @Expose() consegnaNroDoc: number | null;
  @Expose() consegnaAlfaDoc: string | null;
  @Expose() consegnaDataDoc: Date | null;
  @Expose() consegnaDataFirma: Date | null;
  @Expose() consegnaUtente: string | null;
  @Expose() ritiroNroPratica: string | null;
  @Expose() ritiroSerialDoc: string | null;
  @Expose() ritiroNroDoc: number | null;
  @Expose() ritiroAlfaDoc: string | null;
  @Expose() ritiroDataDoc: Date | null;
  @Expose() ritiroDataFirma: Date | null;
  @Expose() ritiroUtente: string | null;
  @Expose() note: string | null;
}

export class ComodatoContrattiMastEdit extends ComodatoContrattiMastBasic {
  @Type(() => ComodatoContrattiDettEdit)
  @Expose()
  dettagli: ComodatoContrattiDettEdit[];
}

export class ComodatoContrattiMastView extends ComodatoContrattiMastBasic {
  @Type(() => ContiBasicGet)
  @Expose()
  conto: ContiBasicGet | null;
}

export class ComodatoContrattiDettEdit {
  @Expose() ID: string;
  @Expose() keyArt: string;
  @Expose() codiceArticolo: string;
  @Expose() idMatricola: string;
  @Expose() consegnaSerialRif: string | null;
  @Expose() ritiroSerialRif: string | null;
  @Expose() idRigaConsegna: string | null;
  @Expose() idRigaRitiro: string | null;
}

export class ComodatoContrattiDettView extends ComodatoContrattiDettEdit {}

export class ComodatoContrattiEdit {
  @IsObject()
  @Type(() => ComodatoContrattiMastBasic)
  contratto: ComodatoContrattiMastBasic;

  @IsArray()
  @Type(() => ComodatoContrattiDettEdit)
  dettagli: ComodatoContrattiDettEdit[];
}

export class SerchDettagliById {
  @IsString()
  ID: string;
}
