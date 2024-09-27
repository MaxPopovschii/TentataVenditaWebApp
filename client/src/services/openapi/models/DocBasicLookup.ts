/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContiBasicGet } from './ContiBasicGet';
import type { DesDiveGet } from './DesDiveGet';
import type { TipoDocGet } from './TipoDocGet';

export type DocBasicLookup = {
    ID: string;
    humanReadableID: string;
    mvnumdoc: number | null;
    idConto: string | null;
    mvdatdoc: string | null;
    mvdatpla: string | null;
    mvtipdoc: string | null;
    mvcladoc: string | null;
    mvflveac: string | null;
    mvflacco: string | null;
    mvflinte: string | null;
    mvflprov: string | null;
    mvnumfat: string | null;
    mvalfdoc: string | null;
    mvdesdoc: string | null;
    conto: ContiBasicGet | null;
    tipoDoc: TipoDocGet | null;
    destinazione: DesDiveGet;
};
