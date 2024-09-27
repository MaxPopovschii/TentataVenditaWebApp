import { Expose, Type } from 'class-transformer';
import { ContiBasicGet } from './Conti.dto';
import { ArticoliView } from './ArtIcol.dto';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class ScontiMaturatiEdit {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  ID: number;

  @IsString()
  @Expose()
  nrContratto: string;

  @Type(() => String)
  @IsString()
  @Expose()
  idRiga: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Expose()
  dataDoc: Date | null;

  @IsString()
  @IsOptional()
  @Expose()
  idCliente: string | null;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @Expose()
  idDestinazione: string | null;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @Expose()
  idArticolo: string | null;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @Expose()
  gruppoMerc: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Expose()
  qtaDoc: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Expose()
  importoDoc: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Expose()
  importoSconto: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Expose()
  qtaSconto: number | null;
}

export class ScontiMaturatiView extends ScontiMaturatiEdit {
  @Expose() rigaContratto: number | null;
  @Type(() => ContiBasicGet) @Expose() conto: ContiBasicGet | null;
  @Type(() => ArticoliView) @Expose() articolo: ArticoliView | null;
}
