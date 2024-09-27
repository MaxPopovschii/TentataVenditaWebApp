import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class ListiniBasic {
  @Expose() codice_articolo: string;
  @Expose() descrizione_articolo: string;
  @Expose() LICODART: string;
  @Expose() codice_listino: string;
  @Expose() descrizione_listino: string;
  @Expose() prezzo: number;
  @Expose() data_attivazione: Date | null;
  @Expose() fine_validita: Date | null;
}

export class ListiniFilters {
  @IsString()
  codice_listino: string;
}
