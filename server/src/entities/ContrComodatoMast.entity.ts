import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conti } from './Conti.entity';
import { DocMast } from './DocMast.entity';
import VersionedEntity from '../VersionedEntity';
import { ContoID, DestinazioneID } from '../../../common/src/index';
import { ContrComodatoDett } from './ContrComodatoDett.entity';
import { FixedColumn } from '../FixedColumn';

@Entity('_COFFEE_CONTR_COMODATO_MAST')
export class ContrComodatoMast extends VersionedEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  ID: number;

  @Column('int', { name: 'NRO_CONTRATTO' })
  numero: number;

  @Column('date', { name: 'DATA_CONTRATTO', nullable: true })
  dataContratto: Date | null;

  @Column('date', { name: 'DATA_ATTIVAZIONE_CONTRATTO', nullable: true })
  dataAttivazioneContratto: Date | null;

  @Column('date', { name: 'DATA_CHIUSURA_CONTRATTO', nullable: true })
  dataChiusuraContratto: Date | null;

  @FixedColumn('nchar', { name: 'TIPO_CONTO', nullable: true, length: 1 })
  clienteTipoConto: string | null;

  @FixedColumn('nchar', { name: 'CLIENTE_CODICE', nullable: true, length: 15 })
  clienteCodice: string | null;

  @JoinColumn([
    { name: 'TIPO_CONTO', referencedColumnName: 'antipcon' },
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

  @FixedColumn('nchar', {
    name: 'CODICE_DESTINAZIONE',
    nullable: true,
    length: 5,
  })
  codiceDestinazione: string | null;

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
      this.codiceDestinazione = id.ddcoddes;
      this.clienteCodice = id.ddcodice;
      this.clienteTipoConto = id.ddtipcon;
    } else {
      this.codiceDestinazione = null;
    }
  }
  @Column('varchar', {
    name: 'CONSEGNA_NRO_PRATICA',
    nullable: true,
    length: 50,
  })
  consegnaNroPratica: string | null;

  @FixedColumn('nchar', {
    name: 'CONSEGNA_SERIAL_DOC',
    nullable: true,
    length: 10,
  })
  consegnaSerialDoc: string | null;

  @JoinColumn({ name: 'CONSEGNA_SERIAL_DOC' })
  @ManyToOne(() => DocMast)
  consegnaDoc: DocMast | null;

  @Column('int', { name: 'CONSEGNA_NRO_DOC', nullable: true })
  consegnaNroDoc: number | null;

  @Column('varchar', { name: 'CONSEGNA_ALFA_DOC', nullable: true, length: 15 })
  consegnaAlfaDoc: string | null;

  @Column('date', { name: 'CONSEGNA_DATA_DOC', nullable: true })
  consegnaDataDoc: Date | null;

  @Column('date', { name: 'CONSEGNA_DATA_FIRMA', nullable: true })
  consegnaDataFirma: Date | null;

  @Column('varchar', { name: 'CONSEGNA_UTENTE', nullable: true, length: 50 })
  consegnaUtente: string | null;

  @Column('varchar', { name: 'RITIRO_NRO_PRATICA', nullable: true, length: 50 })
  ritiroNroPratica: string | null;

  @FixedColumn('nchar', {
    name: 'RITIRO_SERIAL_DOC',
    nullable: true,
    length: 10,
  })
  ritiroSerialDoc: string | null;

  @JoinColumn({ name: 'RITIRO_SERIAL_DOC' })
  @ManyToOne(() => DocMast)
  ritiroDoc: DocMast | null;

  @Column('int', { name: 'RITIRO_NRO_DOC', nullable: true })
  ritiroNroDoc: number | null;

  @Column('varchar', { name: 'RITIRO_ALFA_DOC', nullable: true, length: 15 })
  ritiroAlfaDoc: string | null;

  @Column('date', { name: 'RITIRO_DATA_DOC', nullable: true })
  ritiroDataDoc: Date | null;

  @Column('date', { name: 'RITIRO_DATA_FIRMA', nullable: true })
  ritiroDataFirma: Date | null;

  @Column('varchar', { name: 'RITIRO_UTENTE', nullable: true, length: 50 })
  ritiroUtente: string | null;

  @Column('varchar', { name: 'NOTE', nullable: true, length: 250 })
  note: string | null;

  @OneToMany(() => ContrComodatoDett, (el) => el.contrattoComodato, {
    cascade: true,
  })
  dettagli: ContrComodatoDett[];
}
