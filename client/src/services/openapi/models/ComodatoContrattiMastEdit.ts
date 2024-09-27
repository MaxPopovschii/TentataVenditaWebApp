/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComodatoContrattiDettEdit } from './ComodatoContrattiDettEdit';

export type ComodatoContrattiMastEdit = {
    dettagli: Array<ComodatoContrattiDettEdit>;
    ID: number;
    numero: number;
    dataContratto: string | null;
    dataAttivazioneContratto: string | null;
    dataChiusuraContratto: string | null;
    idCliente: string | null;
    idDestinazione: string | null;
    consegnaNroPratica: string | null;
    consegnaSerialDoc: string | null;
    consegnaNroDoc: number | null;
    consegnaAlfaDoc: string | null;
    consegnaDataDoc: string | null;
    consegnaDataFirma: string | null;
    consegnaUtente: string | null;
    ritiroNroPratica: string | null;
    ritiroSerialDoc: string | null;
    ritiroNroDoc: number | null;
    ritiroAlfaDoc: string | null;
    ritiroDataDoc: string | null;
    ritiroDataFirma: string | null;
    ritiroUtente: string | null;
    note: string | null;
};
