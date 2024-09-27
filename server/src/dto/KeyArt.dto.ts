import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class SearchKeyArtQueryInterface {
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
export class KeyArtView {
  @Expose() ID: string;
  @Expose() humanReadableID: string;
  @Expose() cacodice: string;
  @Expose() cadesart: string | null;
  @Expose() cadessup: string | null;
  @Expose() cacodart: string | null;
  @Expose() catipcon: string | null;
  @Expose() cacodcon: string | null;
  @Expose() caTipo: string | null;
  @Expose() catipbar: string | null;
  @Expose() caflstam: string | null;
  @Expose() caoperat: string | null;
  @Expose() camoltip: number | null;
  @Expose() cadtinva: Date | null;
  @Expose() cadtobso: Date | null;
  @Expose() capesne3: number | null;
  @Expose() capeslo3: number | null;
  @Expose() cadesvo3: string | null;
  @Expose() capzcon3: number | null;
  @Expose() cacocol3: number | null;
  @Expose() cadimlu3: number | null;
  @Expose() cadimla3: number | null;
  @Expose() cadimal3: number | null;
  @Expose() calenscf: number | null;
  @Expose() caflimba: string | null;
  @Expose() capubweb: string | null;
  @Expose() caminven: number | null;
  @Expose() cacodfas: string | null;
  @Expose() canumdeq: string | null;
  @Expose() caflcon3: string | null;
  @Expose() cpupdtms: Date | null;
  @Expose() caflprin: string | null;
  @Expose() caflgart: number | null;
  @Expose() caidguid: string | null;
  @Expose() cacodufi: string | null;
  @Expose() catipean: number | null;
  @Expose() cpccchk: string | null;
}
