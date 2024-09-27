import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('_MATERIALI_DOC_TUTTI')
export class MaterialiDocTutti {
  @PrimaryColumn('nchar', { name: 'MTSERIAL', length: 10 })
  MTSERIAL: string;
  @PrimaryColumn('int', { name: 'MTROWNUM' })
  MTROWNUM: number;
  @PrimaryColumn('int', { name: 'MTNUMRIF' })
  MTNUMRIF: number;
  @Column('nchar', { name: 'MTKEYSAL', length: 20 })
  MTKEYSAL: string;
  @PrimaryColumn('int', { name: 'CPROWNUM' })
  CPROWNUM: number;
  @Column('decimal', { name: 'MTQTAMOV', precision: 20, scale: 8 })
  MTQTAMOV: number;
  @Column('nchar', { name: 'MTCODMAT', length: 40 })
  MTCODMAT: string;
  @Column('nchar', { name: 'MVTIPDOC', length: 5 })
  MVTIPDOC: string;
  @Column('decimal', { name: 'MVNUMDOC', precision: 15, scale: 0 })
  MVNUMDOC: number;
  @Column('date', { name: 'MVDATDOC' })
  MVDATDOC: Date;
  @Column('nvarchar', { name: 'MVNUMFAT', length: 50 })
  MVNUMFAT: string;
  @Column('nchar', { name: 'MVTIPCON', length: 1 })
  MVTIPCON: string;
  @Column('nchar', { name: 'MVCODCON', length: 15 })
  MVCODCON: string;
  @Column('nvarchar', { name: 'ANDESCRI', length: 60 })
  ANDESCRI: string;
  @Column('nchar', { name: 'MVCODICE', length: 20 })
  MVCODICE: string;
  @Column('decimal', { name: 'MVPREZZO', precision: 18, scale: 5 })
  MVPREZZO: number;
  @Column('nchar', { name: 'cod_mag_car', length: 5 })
  cod_mag_car: string;
  @Column('nchar', { name: 'cod_mag_sca', length: 5 })
  cod_mag_sca: string;
  @Column('nvarchar', { name: 'magazzino_carico', length: 30 })
  magazzino_carico: string;
  @Column('nvarchar', { name: 'magazzino_scarico', length: 30 })
  magazzino_scarico: string;
  @Column('nvarchar', { name: 'TDDESDOC', length: 35 })
  TDDESDOC: string;
}
