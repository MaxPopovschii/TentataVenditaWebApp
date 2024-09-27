import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class MaterialiDocTuttiBasic {
  @Expose() MTSERIAL: string;
  @Expose() MTROWNUM: number;
  @Expose() MTNUMRIF: number;
  @Expose() MTKEYSAL: string;
  @Expose() CPROWNUM: number;
  @Expose() MTQTAMOV: number;
  @Expose() MTCODMAT: string;
  @Expose() MVTIPDOC: string;
  @Expose() MVNUMDOC: number;
  @Expose() MVDATDOC: Date;
  @Expose() MVNUMFAT: string;
  @Expose() MVTIPCON: string;
  @Expose() MVCODCON: string;
  @Expose() ANDESCRI: string;
  @Expose() MVCODICE: string;
  @Expose() MVPREZZO: number;
  @Expose() cod_mag_car: string;
  @Expose() cod_mag_sca: string;
  @Expose() magazzino_carico: string;
  @Expose() magazzino_scarico: string;
  @Expose() TDDESDOC: string;
}

export class MaterialiDocTuttiFilters {
  @IsNotEmpty()
  @IsString()
  MTCODMAT: string;
}

export class MaterialiDocTuttiView {
  @Expose() MTKEYSAL: string;
  @Expose() MTCODMAT: string;
  @Expose() MVTIPDOC: string;
  @Expose() MVNUMDOC: number;
  @Expose() MVDATDOC: Date;
  @Expose() MVNUMFAT: string;
  @Expose() ANDESCRI: string;
  @Expose() magazzino_carico: string;
  @Expose() magazzino_scarico: string;
  @Expose() TDDESDOC: string;
}
