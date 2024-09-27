import { Entity, PrimaryColumn } from 'typeorm';

@Entity('_MATURAZIONI_SALDATE_TEST')
export class MaturazioniTest {
  @PrimaryColumn('nchar', { name: 'chius_PTSERIAL', length: 10 })
  serial: string;

  @PrimaryColumn('int', { name: 'chius_PTROWORD' })
  numRow: number;
}
