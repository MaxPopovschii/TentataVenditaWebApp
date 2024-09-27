import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class AgentiBasic {
  @Expose() agcodage: string | null;
  @Expose() agdesage: string | null;
  @Expose() agindage: string | null;
  @Expose() agcitage: string | null;
  @Expose() agproage: string | null;
  @Expose() agfisage: string | null;
  @Expose() agtipage: string | null;
  @Expose() agczoage: string | null;
  @Expose() agcodena: string | null;
  @Expose() agflazie: string | null;
  @Expose() agtipfor: string | null;
  @Expose() agcodfor: string | null;
  @Expose() agtelefo: string | null;
  @Expose() agflescl: string | null;
  @Expose() agdtinit: Date | null;
  @Expose() agdtobso: Date | null;
  @Expose() agritirp: number | null;
  @Expose() agperimp: number | null;
  @Expose() agflfari: string | null;
  @Expose() agflfirr: string | null;
  @Expose() agscopag: string | null;
  @Expose() agagecap: string | null;
  @Expose() aginiena: Date | null;
  @Expose() agfinena: Date | null;
  @Expose() agflgcpz: string | null;
  @Expose() agchksta: string | null;
  @Expose() agchkmai: string | null;
  @Expose() agchkpec: string | null;
  @Expose() agchkfax: string | null;
  @Expose() agchkptl: string | null;
  @Expose() agchkcpz: string | null;
  @Expose() agEmail: string | null;
  @Expose() agEmpec: string | null;
  @Expose() agtelfax: string | null;
  @Expose() agflfold: number | null;
  @Expose() agnotcor: string | null;
  @Expose() agtipsog: string | null;
  @Expose() cpupdtms: Date | null;
  @Expose() agforgiu: string | null;
  @Expose() cpccchk: string | null;
}

export class AgentiView extends AgentiBasic {
  @Expose()
  ID: string;
}

export class AgentiSearchPar {
  @IsString()
  @IsOptional()
  ID?: string;
}
