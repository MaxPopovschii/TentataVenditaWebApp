import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class MatricolaGetQueryParams {
  @IsString()
  ID: string;
}

export class MatricoleSearchQueryParams {
  @IsString()
  searchValue: string;

  @Type(() => Number)
  @IsNumber()
  skip: number;

  @Type(() => Number)
  @IsNumber()
  take: number;
  /*
  @Type(() => String)
  @IsString()
  amcodice: string;
  */
}

export class MatricolaBasicGet {
  @Expose() ID: string;
  @Expose() amcodice: string;
  @Expose() amcodmag: string;
  @Expose() amkeysal: string;
  @Expose() humanReadableID: string;
  @Expose() lnk_matfor: string | null;
}

export class MatSearchParam {
  @IsString()
  amcodice: string;
}
