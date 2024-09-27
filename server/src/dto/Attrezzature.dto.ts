import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TipologieAttrezzature {
  @IsString()
  @Expose()
  facodice: string;

  @IsString()
  @Expose()
  fadescri: string | null;
}

export class SearchAttrezzatureQueryInterface {
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
