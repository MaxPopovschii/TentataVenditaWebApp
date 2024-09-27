import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ContoID, DestinazioneID } from '../../../common/src/index';
import { Conti } from './Conti.entity';
import { ScontiModelli } from './ScontiModelli.entity';
import { ScontiContrattiDett } from './ScontiContrattiDett.entity';
import { Expose } from 'class-transformer';
import VersionedEntity from '../VersionedEntity';
import { FixedColumn } from '../FixedColumn';

@Entity('_COFFEE_SCONTI_CONTRATTI_MAST')
export class ScontiContrattiMast extends VersionedEntity {
  @PrimaryColumn('varchar', {
    name: 'NR_CONTRATTO',
    length: 10,
  })
  ID: string;

  get humanReadableID() {
    return this.ID;
  }

  @Column('date', { name: 'DATA_CONTRATTO', nullable: true })
  dataContratto: Date | null;

  @Column('varchar', { name: 'DESCRIZIONE', nullable: true, length: 100 })
  descrizione: string | null;

  @Column('varchar', { name: 'NOTE', nullable: true, length: 500 })
  note: string | null;

  @Column('varchar', { name: 'CODICE_MODELLO', nullable: true, length: 10 })
  codiceModello: string | null;
  @JoinColumn({
    name: 'CODICE_MODELLO',
    referencedColumnName: 'ID',
  })
  @ManyToOne(() => ScontiModelli)
  modello: ScontiModelli | null;

  @JoinColumn({
    name: 'NR_CONTRATTO',
    referencedColumnName: 'NR_CONTRATTO',
  })
  @OneToMany(() => ScontiContrattiDett, (ogg) => ogg.contrattoSconto, {
    cascade: true,
  })
  dettagli: ScontiContrattiDett[] | null;

  @FixedColumn('nchar', { name: 'TIPO_CONTO', nullable: true, length: 1 })
  clienteTipoConto: string | null;

  @FixedColumn('nchar', { name: 'CLIENTE_CODICE', nullable: true, length: 15 })
  clienteCodice: string | null;

  //idCliente: string | null;

  get idCliente(): string | null {
    if (!this.clienteCodice || !this.clienteTipoConto) {
      return null;
    } else {
      return ContoID.compute({
        ancodice: this.clienteCodice,
        antipcon: this.clienteTipoConto,
      });
    }
  }

  set idCliente(newId: string | null) {
    if (newId) {
      this.clienteCodice = ContoID.parse(newId).ancodice;
      this.clienteTipoConto = ContoID.parse(newId).antipcon;
    } else {
      this.clienteCodice = null;
      this.clienteTipoConto = null;
      this.codiceDestinazione = null;
    }
  }

  @Expose()
  get idDestinazione(): string | null {
    if (
      !this.clienteCodice ||
      !this.clienteTipoConto ||
      !this.codiceDestinazione
    ) {
      return null;
    } else {
      return DestinazioneID.compute({
        ddcodice: this.clienteCodice,
        ddtipcon: this.clienteTipoConto,
        ddcoddes: this.codiceDestinazione,
      });
    }
  }

  set idDestinazione(newId: string | null) {
    if (newId) {
      const id = DestinazioneID.parse(newId);
      this.clienteCodice = id.ddcodice;
      this.clienteTipoConto = id.ddtipcon;
      this.codiceDestinazione = id.ddcoddes;
    } else {
      this.codiceDestinazione = null;
    }
  }

  @JoinColumn([
    { name: 'TIPO_CONTO', referencedColumnName: 'antipcon' },
    { name: 'CLIENTE_CODICE', referencedColumnName: 'ancodice' },
  ])
  @ManyToOne(() => Conti)
  conto: Conti | null;

  @FixedColumn('nchar', {
    name: 'CODICE_DESTINAZIONE',
    nullable: true,
    length: 5,
  })
  codiceDestinazione: string | null;

  @Column('date', { name: 'DATA_INIZIO_VALIDITA', nullable: true })
  dataInizioValidita: Date | null;

  @Column('date', { name: 'DATA_FINE_VALIDITA', nullable: true })
  dataFineValidita: Date | null;

  @Column('decimal', {
    name: 'IMPORTO_SCONTARE_MAX',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  importoScontareMax: number | null;

  @Column('decimal', {
    name: 'IMPORTO_SCONTARE_EROGATO',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  importoScontareErogato: number | null;

  @Column('decimal', {
    name: 'IMPORTO_SCONTARE_RESIDUO',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  importoScontareResiduo: number | null;

  @Column('int', { name: 'MESI_DURATA_CONTRATTO', nullable: true })
  mesiDurataContratto: number | null;

  @Column('decimal', {
    name: 'QTA_SOGLIA_MINIMA',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  qtaSogliaMinima: number | null;

  @Column('date', { name: 'DATA_CHIUSURA', nullable: true })
  dataChiusura: Date | null;

  @Column('varchar', { name: 'MOTIVO_CHIUSURA', nullable: true })
  motivoChiusura: string | null;

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
    name: 'TOT_QTA_OMAGGIATA',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  totQtaOmaggiata: number | null;

  @Column('date', { name: 'DATA_ESAURIMENTO_PREVISTA', nullable: true })
  dataEsaurimentoPrevista: Date | null;

  @Column('date', { name: 'DATA_ESAURIMENTO_EFFETTIVA', nullable: true })
  dataEsaurimentoEffettiva: Date | null;

  @Column('date', { name: 'DATA_ULTIMA_ELABORAZIONE', nullable: true })
  dataUltimaElaborazione: Date;
}
