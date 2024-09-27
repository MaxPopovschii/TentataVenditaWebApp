import { Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class ConsumometrBasic {
  @Expose()
  @IsString()
  operazione: string;

  @Expose()
  @IsBoolean()
  simulato: boolean;

  @Expose()
  @IsString()
  data: string;

  @Expose()
  @IsString()
  @IsOptional()
  agente: string | null;

  @Expose()
  @IsArray()
  tipoSconto: string[];
}
