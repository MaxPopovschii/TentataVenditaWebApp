import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class SearchGruppoMerceologicoQueryInterface {
  @Type(() => String)
  @IsString()
  searchValue: string;

  @Type(() => Number)
  @IsNumber()
  skip: number;

  @Type(() => Number)
  @IsNumber()
  take: number;
}

export class GetGruppoMerceologicoQueryInterface {
  @Type(() => String)
  @IsString()
  ID: string;
}

export class GrupmercView {
  @Expose() ID: string;
  @Expose() humanReadableID: string;
  @Expose() gmdescri: string | null;
  @Expose() utcc: number | null;
  @Expose() utcv: number | null;
  @Expose() utdc: Date | null;
  @Expose() utdv: Date | null;
  @Expose() cpupdtms: Date | null;
  @Expose() cpccchk: string | null;
}
