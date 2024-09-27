/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticoliView } from './ArticoliView';
import type { ContiBasicGet } from './ContiBasicGet';

export type ScontiMaturatiView = {
    rigaContratto: number | null;
    conto: ContiBasicGet | null;
    articolo: ArticoliView | null;
    ID: number;
    nrContratto: string;
    idRiga: string;
    dataDoc: string | null;
    idCliente: string | null;
    idDestinazione: string | null;
    idArticolo: string | null;
    gruppoMerc: string | null;
    qtaDoc: number | null;
    importoDoc: number | null;
    importoSconto: number | null;
    qtaSconto: number | null;
};
