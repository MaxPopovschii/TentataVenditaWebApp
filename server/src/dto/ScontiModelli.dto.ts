import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ScontiModelliSearch {
  @Type(() => String)
  @IsString()
  searchValue: string;
  @IsNumber()
  @Type(() => Number)
  skip: number;
  @Type(() => Number)
  @IsNumber()
  take: number;
}
export class ScontiModelliEdit {
  @Expose() @IsString() ID: string;
  @Expose() @IsString() @IsOptional() descrizione: string | null;
  @Expose() @IsString() @IsOptional() tipoSconto: string | null;
  @Expose() @IsBoolean() @IsOptional() abilitaImportoLimiteMax: boolean | null;
  @Expose() @IsBoolean() @IsOptional() abilitaQtaSogliaMinima: boolean | null;
  @Expose() @IsBoolean() @IsOptional() abilitaQtaOmaggiare: boolean | null;
  @Expose() @IsString() @IsOptional() scontaValoreMerce: string | null;
  @Expose() @IsNumber() @IsOptional() nrMesiBaseCalcolo: number | null;
  @Expose() @IsBoolean() @IsOptional() applicaNotaCredito: boolean | null;
}

export class ScontiModelliBasicView extends ScontiModelliEdit {}

export class ScontiModelliBasicLookup extends ScontiModelliEdit {
  @Expose() humanReadableID: string;
}
export class ScontiModelliLookup extends ScontiModelliEdit {
  @Expose() humanReadableID: string;
}

export class ScontiModelliView extends ScontiModelliLookup {}
