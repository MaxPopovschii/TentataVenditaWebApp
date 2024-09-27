import { Expose } from 'class-transformer';
import {
  Collection,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContoID } from '../../../common/src/index';
import { Conti } from './Conti.entity';
import { ArtIcol } from './ArtIcol.entity';
import { ContrattiScontoDettagliID } from '../../../common/src/index';
import { FixedColumn } from '../FixedColumn';

@Entity('_COFFEE_SCONTI_MATURATI', { schema: 'dbo' })
export class ScontiMaturati {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  ID: number;

  @Column('varchar', { nullable: false, name: 'NR_CONTRATTO', length: 10 })
  nrContratto: string;

  @Column('int', { nullable: false, name: 'RIGA_CONTRATTO' })
  rigaContratto: number;

  get idRiga(): string {
    return ContrattiScontoDettagliID.compute({
      nrContratto: this.nrContratto,
      riga: this.rigaContratto,
    });
  }

  set idRiga(newId: string) {
    if (newId) {
      const parsed = ContrattiScontoDettagliID.parse(newId);
      this.nrContratto = parsed.nrContratto;
      this.rigaContratto = parsed.riga;
    }
  }

  @Column('date', { name: 'DATA_DOC', nullable: true })
  dataDoc: Date | null;

  @FixedColumn('nchar', { name: 'TIPO_CONTO', nullable: true, length: 1 })
  tipoConto: string | null;

  @FixedColumn('nchar', { name: 'CLIENTE_CODICE', nullable: true, length: 15 })
  clienteCodice: string | null;

  @FixedColumn('nchar', {
    name: 'CODICE_DESTINAZIONE',
    nullable: true,
    length: 5,
  })
  codiceDestinazione: string | null;

  @Expose()
  get idCliente(): string | null {
    if (!this.clienteCodice || !this.tipoConto) {
      return null;
    } else {
      return ContoID.compute({
        ancodice: this.clienteCodice,
        antipcon: this.tipoConto,
      });
    }
  }

  set idCliente(newId: string | null) {
    if (newId) {
      this.clienteCodice = ContoID.parse(newId).ancodice;
      this.tipoConto = ContoID.parse(newId).antipcon;
    } else {
      this.clienteCodice = null;
      this.tipoConto = null;
    }
  }
  @JoinColumn([
    { name: 'TIPO_CONTO', referencedColumnName: 'antipcon' },
    { name: 'CLIENTE_CODICE', referencedColumnName: 'ancodice' },
  ])
  @ManyToOne(() => Conti)
  conto: Conti | null;

  @FixedColumn('nchar', { name: 'ARTICOLO', nullable: true, length: 50 })
  idArticolo: string | null;

  @ManyToOne(() => ArtIcol)
  @JoinColumn({ name: 'ARTICOLO' })
  articolo: ArtIcol | null;

  @FixedColumn('nchar', { name: 'GRUPPO_MERC', nullable: true, length: 5 })
  gruppoMerc: string | null;

  @Column('decimal', {
    name: 'QTA_DOC',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  qtaDoc: number | null;

  @Column('decimal', {
    name: 'IMPORTO_DOC',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  importoDoc: number | null;

  @Column('decimal', {
    name: 'IMPORTO_SCONTO',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  importoSconto: number | null;

  @Column('decimal', {
    name: 'QTA_SCONTO',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  qtaSconto: number | null;
}
