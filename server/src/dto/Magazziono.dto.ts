import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class SearchMagazzinoQueryInterface {
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
export class MagazzinoView {
  @Expose()
  ID: string;
  @Expose()
  humanReadableID: string;

  @Expose()
  mgdesmag: string | null;

  @Expose()
  mgindmag: string | null;

  @Expose()
  mgmagcap: string | null;

  @Expose()
  mgcitmag: string | null;

  @Expose()
  mgpromag: string | null;

  @Expose()
  mgfismag: string | null;

  @Expose()
  mgperson: string | null;

  @Expose()
  mgNote: string | null;

  @Expose()
  mgtelefo: string | null;

  @Expose()
  mgEmail: string | null;

  @Expose()
  mgEmpec: string | null;

  @Expose()
  mgdtinva: Date | null;

  @Expose()
  mgdtobso: Date | null;

  @Expose()
  mgmagrag: string | null;

  @Expose()
  mgdismag: string | null;

  @Expose()
  mgtipmag: string | null;

  @Expose()
  mgmagweb: string | null;

  @Expose()
  mgflubic: string | null;

  @Expose()
  mgstaint: string | null;

  @Expose()
  mgprpagm: number | null;

  @Expose()
  mgprefis: string | null;

  @Expose()
  mggescar: string | null;

  @Expose()
  cpupdtms: Date | null;
  @Expose()
  cpccchk: string | null;
}
