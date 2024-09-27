/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TipologieInterventoLookup } from './TipologieInterventoLookup';

export type FamArtiConInterventi = {
    ID: string;
    humanReadableID: string;
    facodice: string;
    fadescri: string | null;
    utcc: number | null;
    utcv: number | null;
    utdc: string | null;
    utdv: string | null;
    cpupdtms: string | null;
    cpccchk: string | null;
    interventi: Array<TipologieInterventoLookup>;
};
