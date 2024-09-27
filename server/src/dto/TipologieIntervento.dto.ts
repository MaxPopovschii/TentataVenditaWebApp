import { Expose, Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { TipologieAttrezzature } from './Attrezzature.dto';

export class TipologieInterventoBasic {
  @IsString()
  @Expose()
  tipoAttrezzatura: string;

  @Type(() => String)
  @IsString()
  @Expose()
  tipoIntervento: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @Expose()
  descrizione?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Expose()
  costo?: number;
}

export class TipologieInterventoLookup extends TipologieInterventoBasic {
  @Expose()
  ID: string;

  @IsString()
  @Expose()
  humanReadableID: string;
}

export class TipologieInterventoView extends TipologieInterventoBasic {
  @IsString()
  @Expose()
  ID: string;

  @Expose()
  @IsObject()
  @Type(() => TipologieAttrezzature)
  famArti: TipologieAttrezzature;
}

export class TipologieInterventoEdit extends TipologieInterventoBasic {
  @IsString()
  @Expose()
  ID: string;
}

export class TipologieInterventoCreate extends TipologieInterventoBasic {}

export class SearchTipologieInterventoQueryInterface {
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
