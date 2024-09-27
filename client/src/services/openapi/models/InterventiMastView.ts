/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticoliView } from "./ArticoliView";
import type { ContiBasicGet } from "./ContiBasicGet";

export type InterventiMastView = {
  codiceMatricola: string;
  conto: ContiBasicGet | null;
  articolo: ArticoliView | null;
  fornitore: ContiBasicGet | null;
  ID: number;
  numero: number | null;
  dataInserimento: string | null;
  dataEsecuzione: string | null;
  internoEsterno: string | null;
  tecnico: string | null;
  utcc: number | null;
  utcv: number | null;
  utdc: string | null;
  utdv: string | null;
  tipoRichiesta: string | null;
  idCliente: string | null;
  codiceArticolo: string | null;
  ardesart: string | null;
  idMatricola: string | null;
  barcode: string | null;
  descrizione: string | null;
  note: string | null;
  idFornitore: string | null;
  nrDocFor: string | null;
  dataDocFor: string | null;
  codiceMagazzino: string | null;
  serialeDoc: string | null;
  matricolaFornitore: string | null;
  idDestinazione: string | null;
};
