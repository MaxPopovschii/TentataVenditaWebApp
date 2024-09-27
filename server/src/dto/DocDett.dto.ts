import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ArticoliView } from './ArtIcol.dto';

export class DocDettGetQueryParams {
  @IsString()
  ID: string;
}

export class DocDettSearchQueryParams {
  @IsString()
  searchValue: string;

  @Type(() => Number)
  @IsNumber()
  skip: number;

  @Type(() => Number)
  @IsNumber()
  take: number;

  @Type(() => String)
  @IsString()
  amcodice: string;
}

export class DocDettBasicGet {
  @Expose() cprownum: number;
  @Expose() ID: string;
  @Expose()
  @Expose()
  humanReadableID: string;

  @Expose()
  cproword: number | null;

  @Expose()
  mvnumrif: number;

  @Expose()
  mvtiprig: string | null;

  @Expose()
  mvdesart: string | null;

  @Expose()
  mvcodart: string | null;

  @Expose()
  mvdessup: string | null;

  @Expose()
  mvqtamov: number | null;
  @Expose()
  mvqtaum1: number | null;

  @Expose()
  mvprezzo: number | null;

  @Expose()
  mvscont1: number | null;

  @Expose()
  mvscont2: number | null;

  @Expose()
  mvscont3: number | null;

  @Expose()
  mvscont4: number | null;
  @Expose()
  mvunimis: string | null;
  @Expose()
  mvvalrig: number | null;
  @Expose()
  mvscontn: string | null;
  @Type(() => ArticoliView)
  @Expose()
  articolo: ArticoliView;
}
