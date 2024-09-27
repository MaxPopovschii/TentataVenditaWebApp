import { DesDiveGet } from './DesDive.dto';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ContiGetQueryParams {
  @IsString()
  ID: string;
}

export class ContiSearchQueryParams {
  @IsString()
  searchValue: string;

  @Type(() => Number)
  @IsNumber()
  skip: number;

  @Type(() => Number)
  @IsNumber()
  take: number;

  @Type(() => String)
  @IsString()
  antipcon: string;
}

export class ContiBasicGet {
  @Expose()
  antipcon: string;
  @Expose()
  ancodice: string;
  @Expose()
  andescri: string | null;
  @Expose()
  ID: string;
  @Expose()
  humanReadableID: string;
}

export class ContiGet extends ContiBasicGet {
  @Expose() andescr2: string | null;
  @Expose() anindiri: string | null;
  @Expose() anindir2: string | null;
  @Expose() anCap: string | null;
  @Expose() anlocali: string | null;
  @Expose() anprovin: string | null;
  @Expose() antelefo: string | null;
  @Expose() antelfax: string | null;
  @Expose() annumcel: string | null;
  @Expose() anperfis: string | null;
  @Expose() anSesso: string | null;
  @Expose() andatnas: Date | null;
  @Expose() anlocnas: string | null;
  @Expose() anpronas: string | null;
  @Expose() ancodfis: string | null;
  @Expose() anpariva: string | null;
  @Expose() anpartsn: string | null;
  @Expose() ancodba2: string | null;
  @Expose() an1Mescl: number | null;
  @Expose() angiosc1: number | null;
  @Expose() an2Mescl: number | null;
  @Expose() angiosc2: number | null;
  @Expose() angiofis: number | null;
  @Expose() an1Scont: number | null;
  @Expose() an2Scont: number | null;
  @Expose() annumlis: string | null;
  @Expose() antipfat: string | null;
  @Expose() anbolfat: string | null;
  @Expose() anprebol: string | null;
  @Expose() anscorpo: string | null;
  @Expose() annumcor: string | null;
  @Expose() anNote: string | null;
  @Expose() anindweb: string | null;
  @Expose() anEmail: string | null;
  @Expose() anEmpec: string | null;
  @Expose() anritenu: string | null;
  @Expose() ancognom: string | null;
  @Expose() anNome: string | null;
  @Expose() anconsup: string | null;
  @Expose() antipsot: string | null;
  @Expose() anccnote: string | null;
  @Expose() ancctagg: string | null;
  /*
  utcc: number | null;
  utcv: number | null;
  utdc: Date | null;
  utdv: Date | null;
   */
  @Expose() andtinva: Date | null;
  @Expose() andtobso: Date | null;
  @Expose() annotain: number | null;
  @Expose() antipclf: string | null;
  @Expose() anflragg: string | null;
  @Expose() andatavv: Date | null;
  @Expose() anflgavv: string | null;
  @Expose() antiprif: string | null;
  @Expose() anconrif: string | null;
  @Expose() anflesig: string | null;
  @Expose() anflcodi: string | null;
  @Expose() afflintr: string | null;
  @Expose() anconcon: string | null;
  @Expose() anflfido: string | null;
  @Expose() anvalfid: number | null;
  @Expose() anmaxord: number | null;
  @Expose() anflblve: string | null;
  @Expose() andatmor: Date | null;
  @Expose() anpagpar: string | null;
  @Expose() ancoimps: string | null;
  @Expose() anpeinps: number | null;
  @Expose() anriinps: number | null;
  @Expose() ancoinps: number | null;
  @Expose() ancodatt: number | null;
  @Expose() ancodtr2: string | null;
  @Expose() anflgis4: string | null;
  @Expose() angescon: string | null;
  @Expose() anflgcon: string | null;
  @Expose() ancodstu: string | null;
  @Expose() anibarid: string | null;
  @Expose() anflaacc: string | null;
  @Expose() anrisese: string | null;
  @Expose() ancodass: string | null;
  @Expose() anclipos: string | null;
  @Expose() anflesim: string | null;
  @Expose() ansagint: number | null;
  @Expose() anflacbd: string | null;
  @Expose() ancinabi: string | null;
  @Expose() anIban: string | null;
  @Expose() anBban: string | null;
  @Expose() ancodesc: string | null;
  @Expose() ancodorn: string | null;
  @Expose() anflimba: string | null;
  @Expose() anspeinc: number | null;
  @Expose() ancodirp: string | null;
  @Expose() ancaurit: string | null;
  @Expose() ancaspro: number | null;
  @Expose() anflgcpz: string | null;
  @Expose() anflsgre: string | null;
  @Expose() anflinca: string | null;
  @Expose() ancodsog: string | null;
  @Expose() ancodcat: string | null;
  @Expose() ancofisc: string | null;
  @Expose() anflgest: string | null;
  @Expose() anflpriv: string | null;
  @Expose() annumcar: string | null;
  @Expose() ancodpor: string | null;
  @Expose() anchksta: string | null;
  @Expose() anchkmai: string | null;
  @Expose() anchkpec: string | null;
  @Expose() anchkfax: string | null;
  @Expose() anchkwwp: string | null;
  @Expose() anchkptl: string | null;
  @Expose() anchkcpz: string | null;
  @Expose() anflgcau: string | null;
  @Expose() anconcau: string | null;
  @Expose() anflivad: string | null;
  @Expose() anflrite: string | null;
  @Expose() ancodsal: string | null;
  @Expose() anErede: string | null;
  @Expose() aneveecc: string | null;
  @Expose() anflapca: string | null;
  @Expose() ancodcuc: string | null;
  @Expose() ancodreg: string | null;
  @Expose() antipocl: string | null;
  @Expose() anchkfir: string | null;
  @Expose() anidridy: string | null;
  @Expose() antiidri: number | null;
  @Expose() anSkype: string | null;
  @Expose() anivasos: string | null;
  @Expose() anflblls: string | null;
  @Expose() anflsoal: string | null;
  @Expose() anflbodo: string | null;
  @Expose() anopetre: string | null;
  @Expose() antippre: string | null;
  @Expose() anrating: string | null;
  @Expose() angiorit: number | null;
  @Expose() anvocfin: string | null;
  @Expose() anescdof: string | null;
  @Expose() andespar: string | null;
  @Expose() anpagfor: string | null;
  @Expose() ancodsns: string | null;
  @Expose() andescr3: string | null;
  @Expose() andescr4: string | null;
  @Expose() anindir3: string | null;
  @Expose() anindir4: string | null;
  @Expose() anlocal2: string | null;
  @Expose() ancodcom: string | null;
  @Expose() anscipag: string | null;
  @Expose() ansprint: string | null;
  @Expose() ancatpar: string | null;
  @Expose() anschuma: string | null;
  @Expose() anforgiu: string | null;
  @Expose() anflfold: number | null;
  @Expose() annotcor: string | null;
  @Expose() antipsog: string | null;
  @Expose() anflgnet: number | null;
  @Expose() cpupdtms: Date | null;
  @Expose() anrivbol: string | null;
  @Expose() anaffida: number | null;
  @Expose() cpccchk: string | null;
  @Expose() @Type(() => DesDiveGet) destinazioni: DesDiveGet[];
}
