import { Expose, Type } from 'class-transformer';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class ByID {
  @Type(() => String)
  @IsString()
  ID: string;
}

export class GeneratedID {
  @Expose()
  ID: string | null;
}

export class GeneratedNumero {
  @Expose()
  numero: number | null;
}

export class GeneratedNumericID {
  @Expose()
  ID: number | null;
}

export class ByNumericID {
  @Type(() => Number)
  @IsInt()
  ID: number;
}
