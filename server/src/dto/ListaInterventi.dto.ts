import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ListaInterventiBasic {
  @Expose() ID: number;
  @Expose() numero: number;
  @Expose() descrizione: string | null;
  @Expose() dataEsecuzione: Date | null;
  @Expose() internoEsterno: string | null;
  @Expose() nomeTecnico: string | null;
  @Expose() tipoRichiesta: string | null;
  @Expose() articolo: string | null;
  @Expose() matricola: string;
  @Expose() matricolaFornitore: string;
  @Expose() noteInterne: string | null;
  @Expose() tipoIntervento: string | null;
  @Expose() noteIntervento: string | null;
  @Expose() costo: number | null;
  @Expose() ardesart: string | null;
}

export class ListaInterventiView {
  @Expose() numero: number;
  @Expose() dataEsecuzione: Date | null;
  @Expose() internoEsterno: string | null;
  @Expose() nomeTecnico: string | null;
  @Expose() tipoRichiesta: string | null;
  @Expose() matricolaFornitore: string;
  @Expose() matricola: string | null;
  @Expose() tipoIntervento: string | null;
  @Expose() noteIntervento: string | null;
  @Expose() costo: number | null;
  @Expose() ardesart: string | null;
}

export class ListaInterventiFilters {
  @IsString()
  @IsNotEmpty()
  matricola: string;
}
