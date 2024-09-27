import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conti } from './Conti.entity';
import { KeyArti } from './KeyArti.entity';
import { DocMast } from './DocMast.entity';
import { Magazzin } from './Magazzin.entity';
import { InterventiDett } from './InterventiDett.entity';
import { FixedColumn } from '../FixedColumn';
import { ArtIcol } from './ArtIcol.entity';
import VersionedEntity from '../VersionedEntity';
import {
  ContoID,
  DestinazioneID,
  MatricolaID,
} from '../../../common/src/index';
import { Expose } from 'class-transformer';

@Entity('_COFFEE_INTERVENTI_MAST')
export class InterventiMast extends VersionedEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  ID: number;

  @Column('int', { name: 'NUMERO_INTERVENTO', nullable: true })
  numero: number | null;

  @Column('date', { name: 'DATA_INSERIMENTO', nullable: true })
  dataInserimento: Date | null;

  @Column('date', { name: 'DATA_ESECUZIONE', nullable: true })
  dataEsecuzione: Date | null;

  @FixedColumn('nchar', { name: 'INTERNO_ESTERNO', nullable: true, length: 1 })
  internoEsterno: string | null;

  @Column('varchar', { name: 'TECNICO', nullable: true, length: 50 })
  tecnico: string | null;

  @Column('varchar', { name: 'TIPO_RICHIESTA', nullable: true, length: 50 })
  tipoRichiesta: string | null;

  @FixedColumn('nchar', {
    name: 'CLIENTE_TIPO_CONTO',
    nullable: true,
    length: 1,
  })
  clienteTipoConto: string | null;

  @FixedColumn('nchar', { name: 'CLIENTE_CODICE', nullable: true, length: 15 })
  clienteCodice: string | null;

  @JoinColumn([
    { name: 'CLIENTE_TIPO_CONTO', referencedColumnName: 'antipcon' },
    { name: 'CLIENTE_CODICE', referencedColumnName: 'ancodice' },
  ])
  @ManyToOne(() => Conti)
  conto: Conti | null;

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
  @FixedColumn('nchar', { name: 'ARTICOLO', nullable: true, length: 20 })
  codiceArticolo: string | null;

  @FixedColumn('nchar', { name: 'MATRICOLA', nullable: true, length: 40 })
  codiceMatricola: string | null;

  @ManyToOne(() => ArtIcol)
  @JoinColumn({ name: 'ARTICOLO', referencedColumnName: 'ID' })
  articolo: ArtIcol | null;

  @FixedColumn('nchar', {
    name: 'DESCRIZIONE_ARTICOLO',
    nullable: true,
    length: 40,
  })
  ardesart: string | null;

  get idMatricola(): string | null {
    if (!this.codiceArticolo || !this.codiceMatricola) {
      return null;
    } else {
      return MatricolaID.compute({
        amkeysal: this.codiceArticolo,
        amcodice: this.codiceMatricola,
      });
    }
  }

  set idMatricola(newId: string | null) {
    if (newId) {
      this.codiceArticolo = MatricolaID.parse(newId).amkeysal;
      this.codiceMatricola = MatricolaID.parse(newId).amcodice;
    } else {
      this.codiceMatricola = null;
    }
  }

  @FixedColumn('nchar', { name: 'BARCODE', nullable: true, length: 20 })
  barcode: string | null;

  @ManyToOne(() => KeyArti)
  @JoinColumn({ name: 'BARCODE' })
  keyArti: KeyArti | null;

  @Column('varchar', { name: 'DESCRIZIONE', nullable: true, length: 200 })
  descrizione: string | null;

  @Column('varchar', { name: 'NOTE', nullable: true, length: 200 })
  note: string | null;

  @FixedColumn('nchar', {
    name: 'FORNITORE_TIPO_CONTO',
    nullable: true,
    length: 1,
  })
  fornitoreTipoConto: string | null;

  @FixedColumn('nchar', {
    name: 'FORNITORE_CODICE',
    nullable: true,
    length: 15,
  })
  fornitoreCodice: string | null;

  @JoinColumn([
    { name: 'FORNITORE_TIPO_CONTO', referencedColumnName: 'antipcon' },
    { name: 'FORNITORE_CODICE', referencedColumnName: 'ancodice' },
  ])
  @ManyToOne(() => Conti)
  fornitore: Conti | null;

  get idFornitore(): string | null {
    if (!this.fornitoreCodice || !this.fornitoreTipoConto) {
      return null;
    } else {
      return ContoID.compute({
        ancodice: this.fornitoreCodice,
        antipcon: this.fornitoreTipoConto,
      });
    }
  }

  set idFornitore(newId: string | null) {
    if (newId) {
      this.fornitoreCodice = ContoID.parse(newId).ancodice;
      this.fornitoreTipoConto = ContoID.parse(newId).antipcon;
    } else {
      this.fornitoreCodice = null;
      this.fornitoreTipoConto = null;
    }
  }

  @FixedColumn('nchar', { name: 'NR_DOC_FOR', nullable: true, length: 10 })
  nrDocFor: string | null;

  @Column('date', { name: 'DATA_DOC_FOR', nullable: true })
  dataDocFor: Date | null;

  @FixedColumn('nchar', { name: 'MAGAZZINO', nullable: true, length: 5 })
  codiceMagazzino: string | null;

  @ManyToOne(() => Magazzin)
  @JoinColumn({ name: 'MAGAZZINO' })
  magazzino: Magazzin | null;

  @FixedColumn('nchar', { name: 'SERIALE_DOC', nullable: true, length: 10 })
  serialeDoc: string | null;

  @Column('varchar', {
    name: 'MATRICOLA_FORNITORE',
    nullable: true,
    length: 40,
  })
  matricolaFornitore: string | null;

  @FixedColumn('nchar', {
    name: 'CODICE_DESTINAZIONE',
    nullable: true,
    length: 5,
  })
  codiceDestinazione: string | null;

  @ManyToOne(() => DocMast)
  @JoinColumn({ name: 'SERIALE_DOC' })
  documento: DocMast | null;

  @OneToMany(() => InterventiDett, (el) => el.intervento, { cascade: true })
  dettagli: InterventiDett[];
}
