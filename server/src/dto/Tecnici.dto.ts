import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class TecniciBasic {
  @Expose()
  @IsNumberString()
  @IsNotEmpty()
  codice: string;
  @Expose()
  @IsString()
  @IsOptional()
  descrizione: string;
  @Expose()
  @IsString()
  @IsOptional()
  tipo: string;
  @Expose()
  @IsString()
  @IsOptional()
  codiceFornitore: string;
  @Expose()
  @IsString()
  @IsOptional()
  magazzino: string;
}

export class TecniciView extends TecniciBasic {
  @Expose()
  @IsOptional()
  ID: string | null;
  @Expose()
  @IsOptional()
  humanReadableID: string;
}

export class TecniciInputView extends TecniciBasic {
  @Expose()
  ID: string;
  @Expose()
  humanReadableID: string;
}

export class TecniciSearchQueryParams {
  @IsString()
  searchValue: string;

  @Type(() => Number)
  @IsNumber()
  skip: number;

  @Type(() => Number)
  @IsNumber()
  take: number;
}

export class TecniciGetQueryParams {
  @IsString()
  ID: string;
}
