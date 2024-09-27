import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsBooleanString,
  IsOptional,
  IsString,
} from 'class-validator';

export class MaturazioniBasic {
  @Expose() serial: string;
  @Expose() numRow: number;
  @Expose() dataReg: Date | null;
  @Expose() mpSerial: string | null;
  @Expose() rigaProv: number | null;

  @Expose() numberPar: string | null;
  @Expose() codiceCon: string | null;
  @Expose() modPag: string | null;
  @Expose() totImpCh: number | null;
  @Expose() numFat: string | null;
  @Expose() dataDoc: Date | null;
  @Expose() serRif: string | null;
  @Expose() ordRif: number | null;
  @Expose() codAge: string | null;
  @Expose() ptSerial: string | null;
  @Expose() wordAp: number | null;
  @Expose() numDoc: number | null;
  @Expose() alfDoc: string | null;
  @Expose() modPagApe: string | null;
  @Expose() dataDocApe: Date | null;
  @Expose() serialN: string | null;
  @Expose() numPnt: number | null;

  @Expose() mpNumReg: number | null;
  @Expose() prov: number | null;
  @Expose() ageCap: string | null;
  @Expose() dataSca: Date | null;
  @Expose() tipMat: string | null;
  @Expose() dataMat: Date | null;
  @Expose() desAge: string | null;
  @Expose() descrizione: string | null;
  @Expose() totImp: number | null;
  @Expose() perPra: number | null;
  @Expose() totAge: number | null;
}

export class MaturazioniView extends MaturazioniBasic {
  @IsString()
  ID: string;
}
export class MaturazioniFilter {
  @IsOptional()
  dataStart?: Date;

  @IsOptional()
  dataEnd?: Date;

  @IsOptional()
  dataDoc?: Date;

  @IsString()
  @IsOptional()
  codAgeStart?: string;

  @IsString()
  @IsOptional()
  codAgeEnd?: string;

  @IsBooleanString()
  registrato: string;
}
