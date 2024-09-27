/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticoliView } from './ArticoliView';

export type ScontiContrattiDettView = {
    ID: string;
    codiceArticolo: string | null;
    codiceGruppoMerc: string | null;
    percScontare: number | null;
    qtaSogliaMinima: number | null;
    qtaOmaggiare: number | null;
    dataInizioValidita: string | null;
    dataFineValidita: string | null;
    kgMinimoSettimana: number | null;
    kgMinimoMese: number | null;
    kgMinimoAnno: number | null;
    totImportoScontato: number | null;
    totQtaScontata: number | null;
    dataUltimaElaborazione: string | null;
    articolo: ArticoliView | null;
    humanReadableID: string;
};
