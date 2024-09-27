import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MopDettBasic {
  @Expose() mpSerial: string;
  @Expose() numRow: number;
  @Expose() ageCap: string | null;
  @Expose() dataSca: Date | null;
  @Expose() dataMat: Date | null;
  @Expose() totImp: number | null;
  @Expose() perPrc: number | null;
  @Expose() perPra: number | null;
  @Expose() totAge: number | null;
  @Expose() totZon: number | null;
  @Expose() tipMat: string | null;
  @Expose() flsOsp: string | null;
  @Expose() dateLiq: Date | null;
  @Expose() pannLiq: string | null;
  @Expose() liqAge: number | null;
  @Expose() liqCap: number | null;
  @Expose() totImp2: number | null;
  @Expose() cpccchk: string;
}

export class MopDettPar {
  ID: string;
  @IsNotEmpty()
  @IsString()
  mpSerial: string;
  @IsNumber()
  @IsNotEmpty()
  numRow: number;
  @IsDate()
  @IsNotEmpty()
  dataMat: Date;
}

export class MopDettView extends MopDettBasic {
  ID: string;
}
