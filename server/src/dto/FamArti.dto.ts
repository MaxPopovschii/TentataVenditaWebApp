import { Expose, Type } from 'class-transformer';
import { TipiInterventi } from '../entities/TipiInterventi.entity';
import {
  TipologieInterventoBasic,
  TipologieInterventoLookup,
} from './TipologieIntervento.dto';

export class FamArtiBasic {
  @Expose() ID: string;
  @Expose() humanReadableID: string;
  @Expose() facodice: string;
  @Expose() fadescri: string | null;
  @Expose() utcc: number | null;
  @Expose() utcv: number | null;
  @Expose() utdc: Date | null;
  @Expose() utdv: Date | null;
  @Expose() cpupdtms: Date | null;
  @Expose() cpccchk: string | null;
}

export class FamArtiConInterventi extends FamArtiBasic {
  @Type(() => TipologieInterventoLookup)
  @Expose()
  interventi: TipologieInterventoLookup[];
}
