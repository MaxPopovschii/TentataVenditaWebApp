import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ScontiContrattiMast } from './ScontiContrattiMast.entity';
import { ArtIcol } from './ArtIcol.entity';
import { Grumerc } from './Grumerc.entity';
import { ContrattiScontoDettagliID } from '../../../common/src/index';
import { FixedColumn } from '../FixedColumn';

@Entity('_COFFEE_SCONTI_CONTRATTI_DETT')
export class ScontiContrattiDett {
  @PrimaryColumn('varchar', { name: 'NR_CONTRATTO', length: 10 })
  nrContratto: string;

  @JoinColumn({ name: 'NR_CONTRATTO' })
  @ManyToOne(() => ScontiContrattiMast, (ogg) => ogg.dettagli, {
    orphanedRowAction: 'delete',
  })
  contrattoSconto: ScontiContrattiMast;

  @PrimaryColumn('int', { name: 'RIGA' })
  riga: number;

  get humanReadableID() {
    return this.riga.toString();
  }

  get ID() {
    return ContrattiScontoDettagliID.compute(this);
  }

  set ID(id: string) {
    const parsedId = ContrattiScontoDettagliID.parse(id);
    this.nrContratto = parsedId.nrContratto;
    this.riga = parsedId.riga;
  }

  @FixedColumn('nchar', { name: 'ARTICOLO', nullable: true, length: 20 })
  codiceArticolo: string | null;

  @ManyToOne(() => ArtIcol)
  @JoinColumn({ name: 'ARTICOLO' })
  articolo: ArtIcol | null;

  @FixedColumn('nchar', { name: 'GRUPPO_MERC', nullable: true, length: 5 })
  codiceGruppoMerc: string | null;

  @ManyToOne(() => Grumerc)
  @JoinColumn({ name: 'GRUPPO_MERC' })
  gruppoMerc: Grumerc | null;

  @Column('decimal', {
    name: 'PERC_SCONTARE',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  percScontare: number | null;

  @Column('decimal', {
    name: 'QTA_SOGLIA_MINIMA',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  qtaSogliaMinima: number | null;

  @Column('decimal', {
    name: 'QTA_OMAGGIARE',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  qtaOmaggiare: number | null;

  @Column('date', { name: 'DATA_INIZIO_VALIDITA', nullable: true })
  dataInizioValidita: Date | null;

  @Column('date', { name: 'DATA_FINE_VALIDITA', nullable: true })
  dataFineValidita: Date | null;

  @Column('decimal', {
    name: 'KG_MINIMO_SETTIMANA',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  kgMinimoSettimana: number | null;

  @Column('decimal', {
    name: 'KG_MINIMO_MESE',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  kgMinimoMese: number | null;

  @Column('decimal', {
    name: 'KG_MINIMO_ANNO',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  kgMinimoAnno: number | null;

  @Column('decimal', {
    name: 'TOT_IMPORTO_SCONTATO',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  totImportoScontato: number | null;

  @Column('decimal', {
    name: 'TOT_QTA_SCONTATA',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  totQtaScontata: number | null;
}
