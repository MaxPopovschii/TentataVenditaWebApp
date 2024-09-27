import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Conti } from '../entities/Conti.entity';
import { ContiBasicGet } from './Conti.dto';
import { TipoDoc } from '../entities/TipoDoc.entity';
import { DesDiveGet } from './DesDive.dto';
import { ByID } from './Generic.dto';

export class DocByContoParams extends ByID {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : null,
  )
  @ApiProperty({ type: String })
  causali: string[] | null;
}

export class DocSearchParams {
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
  idConto: string;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : null,
  )
  @ApiProperty({ type: String })
  causali: string[] | null;
}

export class DocBasicLookup {
  @Expose() ID: string;
  @Expose() humanReadableID: string;
  @Expose() mvnumdoc: number | null;
  @Expose() idConto: string | null;
  @Expose() mvdatdoc: Date | null;
  @Expose() mvdatpla: Date | null;
  @Expose() mvtipdoc: string | null;
  @Expose() mvcladoc: string | null;
  @Expose() mvflveac: string | null;
  @Expose() mvflacco: string | null;
  @Expose() mvflinte: string | null;
  @Expose() mvflprov: string | null;
  @Expose() mvnumfat: string | null;
  @Expose() mvalfdoc: string | null;
  @Expose() mvdesdoc: string | null;
  @Type(() => ContiBasicGet)
  @Expose()
  conto: ContiBasicGet | null;
  @Type(() => TipoDocGet)
  @Expose()
  tipoDoc: TipoDocGet | null;
  @Type(() => DesDiveGet)
  @Expose()
  destinazione: DesDiveGet;
}
export class TipoDocGet {
  @Expose()
  tdtipdoc: string;

  @Expose()
  tddesdoc: string | null;
}

export class DocLookup extends DocBasicLookup {
  @Expose() mvcodute: number | null;
  @Expose() mvnumreg: number | null;
  @Expose() mvdatreg: Date | null;
  @Expose() mvdatpla: Date | null;
  @Expose() mvtipdoc: string | null;
  @Expose() mvcladoc: string | null;
  @Expose() mvflveac: string | null;
  @Expose() mvflacco: string | null;
  @Expose() mvflinte: string | null;
  @Expose() mvflprov: string | null;
  @Expose() mvprd: string | null;
  @Expose() mvcodese: string | null;
  @Expose() mvprp: string | null;
  @Expose() mvanndoc: string | null;
  @Expose() mvannpro: string | null;
  @Expose() mvnumest: number | null;
  @Expose() mvalfest: string | null;
  @Expose() mvdatest: Date | null;
  @Expose() mvdatciv: Date | null;
  @Expose() mvtcontr: string | null;
  @Expose() mvtcolis: string | null;
  @Expose() mvtfragg: string | null;
  @Expose() mvcoddes: string | null;
  @Expose() mvdatdiv: Date | null;
  @Expose() mvcodban: string | null;
  @Expose() mvcodba2: string | null;
  @Expose() mvvalnaz: string | null;
  @Expose() mvcaoval: number | null;
  @Expose() mvscocl1: number | null;
  @Expose() mvscocl2: number | null;
  @Expose() mvscopag: number | null;
  @Expose() mvflscor: string | null;
  @Expose() mvflgiom: string | null;
  @Expose() mvtincom: Date | null;
  @Expose() mvtficom: Date | null;
  @Expose() mvflgcrm: number | null;
  @Expose() mvdatsca: Date | null;
  @Expose() mvtipsog: string | null;
  @Expose() mvpntcrm: string | null;
  @Expose() mvlstype: number | null;
  @Expose() mvrevoff: string | null;
  @Expose() mvsersto: string | null;
  @Expose() mvseqsto: number | null;
  @Expose() mvlinsto: number | null;
  @Expose() mvdatini: Date | null;
  @Expose() mvdatsto: Date | null;
  @Expose() mvflanal: string | null;
  @Expose() cpupdtms: Date | null;
  @Expose() mvflfosc: string | null;
  @Expose() mvsconti: number | null;
  @Expose() mvivainc: string | null;
  @Expose() mvflrinc: string | null;
  @Expose() mvivatra: string | null;
  @Expose() mvspebol: number | null;
  @Expose() mvspetra: number | null;
  @Expose() mvivaarr: string | null;
  @Expose() mvivaimb: string | null;
  @Expose() mvflrtra: string | null;
  @Expose() mvivabol: string | null;
  @Expose() mvimparr: number | null;
  @Expose() mvaccpre: number | null;
  @Expose() mvtotrit: number | null;
  @Expose() mvmaxacc: number | null;
  @Expose() mvflrimb: string | null;
  @Expose() mvspeimb: number | null;
  @Expose() mvaccsuc: number | null;
  @Expose() mvtotena: number | null;
  @Expose() mvspeinc: number | null;
  @Expose() mvconcon: string | null;
  @Expose() mvqtacol: number | null;
  @Expose() mvaspest: string | null;
  @Expose() mvqtapes: number | null;
  @Expose() mvcodorn: string | null;
  @Expose() mvnotagg: string | null;
  @Expose() mvqtalor: number | null;
  @Expose() mvgeneff: string | null;
  @Expose() mvtiporn: string | null;
  @Expose() mvgenpro: string | null;
  @Expose() mvaccont: number | null;
  @Expose() mvrifpia: string | null;
  @Expose() mvrifcon: string | null;
  @Expose() mvmintra: string | null;
  @Expose() mvflcont: string | null;
  @Expose() mvrifacc: string | null;
  @Expose() mvdattra: Date | null;
  @Expose() mvaciva5: string | null;
  @Expose() mvaciva1: string | null;
  @Expose() mvoratra: string | null;
  @Expose() mvaciva3: string | null;
  @Expose() mvaciva4: string | null;
  @Expose() mvaciva2: string | null;
  @Expose() mvriffad: string | null;
  @Expose() mvaimpn1: number | null;
  @Expose() mvaciva6: string | null;
  @Expose() mvaimpn5: number | null;
  @Expose() mvaimpn6: number | null;
  @Expose() mvaimpn2: number | null;
  @Expose() mvaimpn3: number | null;
  @Expose() mvaimps6: number | null;
  @Expose() mvaimpn4: number | null;
  @Expose() mvaimps4: number | null;
  @Expose() mvaimps3: number | null;
  @Expose() mvaimps2: number | null;
  @Expose() mvaimps5: number | null;
  @Expose() mvaflom1: string | null;
  @Expose() mvaflom2: string | null;
  @Expose() mvaflom4: string | null;
  @Expose() mvaflom6: string | null;
  @Expose() mvaflom3: string | null;
  @Expose() mvaimps1: number | null;
  @Expose() mvaflom5: string | null;
  @Expose() mvannret: string | null;
  @Expose() mvtipper: string | null;
  @Expose() mvperret: number | null;
  @Expose() mvtraint: number | null;
  @Expose() mvNote: string | null;
  @Expose() mvflintr: string | null;
  @Expose() mvflsald: string | null;
  @Expose() mvflcapa: string | null;
  @Expose() mvflscaf: string | null;
  @Expose() mvrifesp: string | null;
  @Expose() mvmovcom: string | null;
  @Expose() mvrifodl: string | null;
  @Expose() mvrifdco: string | null;
  @Expose() mvflbloc: string | null;
  @Expose() mvserddt: string | null;
  @Expose() mvrowddt: number | null;
  @Expose() mvfloffe: string | null;
  @Expose() mvcodsed: string | null;
  @Expose() mvflvabd: string | null;
  @Expose() mvaccold: number | null;
  @Expose() mvnumcor: string | null;
  @Expose() mvserweb: string | null;
  @Expose() mvritpre: number | null;
  @Expose() mvperfin: number | null;
  @Expose() mvimpfin: number | null;
  @Expose() mvflsfin: string | null;
  @Expose() mvflscom: string | null;
  @Expose() mvcauimb: number | null;
  @Expose() mvivacau: string | null;
  @Expose() mvritatt: number | null;
  @Expose() mvflfoca: string | null;
  @Expose() mvtipimb: string | null;
  @Expose() mvserest: string | null;
  @Expose() mvflsend: string | null;
  @Expose() mvAnno: number | null;
  @Expose() mvMese: number | null;
  @Expose() mvtipdis: string | null;
  @Expose() mvgenpos: boolean | null;
  @Expose() mvstfilcb: string | null;
  @Expose() mvflginc: string | null;
  @Expose() mvemeric: string | null;
  @Expose() mvagg_01: string | null;
  @Expose() mvagg_02: string | null;
  @Expose() mvagg_03: string | null;
  @Expose() mvagg_04: string | null;
  @Expose() mvagg_05: Date | null;
  @Expose() mvagg_06: Date | null;
  @Expose() mvrifpro: string | null;
  @Expose() mvgenpre: string | null;
  @Expose() mvrifest: string | null;
  @Expose() mvnotrit: string | null;
  @Expose() mvnumfat: string | null;
  @Expose() mvprznet: number | null;
  @Expose() mvvarvuo: string | null;
  @Expose() mvflfobo: string | null;
  @Expose() mvripbol: string | null;
  @Expose() mvposcnt: string | null;
  @Expose() mvpossto: string | null;
  @Expose() mvposreg: string | null;
  @Expose() mvivablo: number | null;
  @Expose() cpccchk: string | null;
}
