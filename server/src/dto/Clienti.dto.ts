import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ClientiBasic {
  @Expose()
  @IsString()
  tipoConto: string;
  @Expose()
  @IsString()
  codiceConto: string;
  @Expose()
  @IsNumber()
  @IsOptional()
  consumoMin: number;
  @Expose()
  @IsNumber()
  @IsOptional()
  consumoMinCaffe: number;
  @Expose()
  @IsString()
  @IsOptional()
  raggruppaPerSede: string;
  @Expose()
  @IsString()
  @IsOptional()
  forzaUnicoPagamento: string;
  @Expose()
  @IsString()
  @IsOptional()
  ragioneSocialeCorta: string;
  @Expose()
  @IsString()
  @IsOptional()
  ragSocBI: string;
}

export class ClientiView extends ClientiBasic {
  @Expose()
  @IsString()
  @IsOptional()
  ID: string;
}
