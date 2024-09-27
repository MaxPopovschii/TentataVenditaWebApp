/* eslint-disable prettier/prettier */
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { MatricolaBasicGet } from './Matricole.dto';

export class SearchArticoliQueryInterface {
  @Type(() => String)
  @IsString()
  searchValue: string;

  @Type(() => Number)
  @IsNumber()
  skip: number;

  @Type(() => Number)
  @IsNumber()
  take: number;
}
export class ArticoliView {
  @Expose()
  ID: string;

  @Expose() humanReadableID: string;

  @Expose()
  @IsArray()
  @Type(() => MatricolaBasicGet)
  matricole: MatricolaBasicGet[];

  @Expose()
  arcodar2: string;

  @Expose()
  ardesart: string | null;

  @Expose()
  ardessup: string | null;

  @Expose()
  aroperat: string | null;

  @Expose()
  arcodfam: string | null;
  @Expose()
  matricolaId: string | null;

  @Expose()
  key: string;
}
