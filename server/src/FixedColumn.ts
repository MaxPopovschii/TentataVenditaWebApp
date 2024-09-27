import { WithLengthColumnType } from 'typeorm/driver/types/ColumnTypes';
import { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions';
import { ColumnWithLengthOptions } from 'typeorm/decorator/options/ColumnWithLengthOptions';
import { Column, PrimaryColumn, PrimaryColumnOptions } from 'typeorm';

export function FixedColumn(
  type: WithLengthColumnType,
  options?: ColumnCommonOptions & ColumnWithLengthOptions,
): PropertyDecorator {
  if (type !== 'nchar') throw new Error('Type must be NCHAR');
  const length = options?.length;
  if (!length || typeof length !== 'number')
    throw new Error('Lunghezza non impostata');
  const myOptions: ColumnCommonOptions & ColumnWithLengthOptions = {
    length,
    transformer: {
      from(value) {
        return value?.trim() ? value.trim() : null;
      },
      to(value) {
        return value ?? null;
        //return value ? value.padEnd(length, ' ') : null;
      },
    },
    ...options,
  };
  return Column(type, myOptions);
}

export function FixedPrimaryColumn(
  type: WithLengthColumnType,
  options?: PrimaryColumnOptions,
): PropertyDecorator {
  if (type !== 'nchar') throw new Error('Type must be NCHAR');
  const length = options?.length;
  if (!length || typeof length !== 'number')
    throw new Error('Lunghezza non impostata');
  const myOptions: PrimaryColumnOptions = {
    length,
    transformer: {
      from(value) {
        return value?.trim() ? value.trim() : null;
      },
      to(value) {
        return value ?? null;
        //return value ? value.padEnd(length, ' ') : null;
      },
    },
    ...options,
  };
  return PrimaryColumn(type, myOptions);
}
