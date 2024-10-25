/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContiBasicGet } from './ContiBasicGet';
import type { DesDiveGet } from './DesDiveGet';
import type { TipoDocGet } from './TipoDocGet';

export type DocLookup = {
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
    mvcodute: number | null;
    mvnumreg: number | null;
    mvdatreg: string | null;
    mvprd: string | null;
    mvcodese: string | null;
    mvprp: string | null;
    mvanndoc: string | null;
    mvannpro: string | null;
    mvnumest: number | null;
    mvalfest: string | null;
    mvdatest: string | null;
    mvdatciv: string | null;
    mvtcontr: string | null;
    mvtcolis: string | null;
    mvtfragg: string | null;
    mvcoddes: string | null;
    mvdatdiv: string | null;
    mvcodban: string | null;
    mvcodba2: string | null;
    mvvalnaz: string | null;
    mvcaoval: number | null;
    mvscocl1: number | null;
    mvscocl2: number | null;
    mvscopag: number | null;
    mvflscor: string | null;
    mvflgiom: string | null;
    mvtincom: string | null;
    mvtficom: string | null;
    mvflgcrm: number | null;
    mvdatsca: string | null;
    mvtipsog: string | null;
    mvpntcrm: string | null;
    mvlstype: number | null;
    mvrevoff: string | null;
    mvsersto: string | null;
    mvseqsto: number | null;
    mvlinsto: number | null;
    mvdatini: string | null;
    mvdatsto: string | null;
    mvflanal: string | null;
    cpupdtms: string | null;
    mvflfosc: string | null;
    mvsconti: number | null;
    mvivainc: string | null;
    mvflrinc: string | null;
    mvivatra: string | null;
    mvspebol: number | null;
    mvspetra: number | null;
    mvivaarr: string | null;
    mvivaimb: string | null;
    mvflrtra: string | null;
    mvivabol: string | null;
    mvimparr: number | null;
    mvaccpre: number | null;
    mvtotrit: number | null;
    mvmaxacc: number | null;
    mvflrimb: string | null;
    mvspeimb: number | null;
    mvaccsuc: number | null;
    mvtotena: number | null;
    mvspeinc: number | null;
    mvconcon: string | null;
    mvqtacol: number | null;
    mvaspest: string | null;
    mvqtapes: number | null;
    mvcodorn: string | null;
    mvnotagg: string | null;
    mvqtalor: number | null;
    mvgeneff: string | null;
    mvtiporn: string | null;
    mvgenpro: string | null;
    mvaccont: number | null;
    mvrifpia: string | null;
    mvrifcon: string | null;
    mvmintra: string | null;
    mvflcont: string | null;
    mvrifacc: string | null;
    mvdattra: string | null;
    mvaciva5: string | null;
    mvaciva1: string | null;
    mvoratra: string | null;
    mvaciva3: string | null;
    mvaciva4: string | null;
    mvaciva2: string | null;
    mvriffad: string | null;
    mvaimpn1: number | null;
    mvaciva6: string | null;
    mvaimpn5: number | null;
    mvaimpn6: number | null;
    mvaimpn2: number | null;
    mvaimpn3: number | null;
    mvaimps6: number | null;
    mvaimpn4: number | null;
    mvaimps4: number | null;
    mvaimps3: number | null;
    mvaimps2: number | null;
    mvaimps5: number | null;
    mvaflom1: string | null;
    mvaflom2: string | null;
    mvaflom4: string | null;
    mvaflom6: string | null;
    mvaflom3: string | null;
    mvaimps1: number | null;
    mvaflom5: string | null;
    mvannret: string | null;
    mvtipper: string | null;
    mvperret: number | null;
    mvtraint: number | null;
    mvNote: string | null;
    mvflintr: string | null;
    mvflsald: string | null;
    mvflcapa: string | null;
    mvflscaf: string | null;
    mvrifesp: string | null;
    mvmovcom: string | null;
    mvrifodl: string | null;
    mvrifdco: string | null;
    mvflbloc: string | null;
    mvserddt: string | null;
    mvrowddt: number | null;
    mvfloffe: string | null;
    mvcodsed: string | null;
    mvflvabd: string | null;
    mvaccold: number | null;
    mvnumcor: string | null;
    mvserweb: string | null;
    mvritpre: number | null;
    mvperfin: number | null;
    mvimpfin: number | null;
    mvflsfin: string | null;
    mvflscom: string | null;
    mvcauimb: number | null;
    mvivacau: string | null;
    mvritatt: number | null;
    mvflfoca: string | null;
    mvtipimb: string | null;
    mvserest: string | null;
    mvflsend: string | null;
    mvAnno: number | null;
    mvMese: number | null;
    mvtipdis: string | null;
    mvgenpos: boolean | null;
    mvstfilcb: string | null;
    mvflginc: string | null;
    mvemeric: string | null;
    mvagg_01: string | null;
    mvagg_02: string | null;
    mvagg_03: string | null;
    mvagg_04: string | null;
    mvagg_05: string | null;
    mvagg_06: string | null;
    mvrifpro: string | null;
    mvgenpre: string | null;
    mvrifest: string | null;
    mvnotrit: string | null;
    mvprznet: number | null;
    mvvarvuo: string | null;
    mvflfobo: string | null;
    mvripbol: string | null;
    mvposcnt: string | null;
    mvpossto: string | null;
    mvposreg: string | null;
    mvivablo: number | null;
    cpccchk: string | null;
};
