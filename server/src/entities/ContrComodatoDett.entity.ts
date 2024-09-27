import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { KeyArti } from './KeyArti.entity';
import { Matricol } from './Matricol.entity';
import { DocDett } from './DocDett.entity';
import { ContrComodatoMast } from './ContrComodatoMast.entity';
import { FixedColumn, FixedPrimaryColumn } from '../FixedColumn';
import {
  ComodatoContrattoDettagliID,
  DocDettID,
  MatricolaID,
} from '../../../common/src/index';

@Entity('_COFFEE_CONTR_COMODATO_DETT', { schema: 'dbo' })
export class ContrComodatoDett {
  @PrimaryColumn('int', { name: 'ID_CONTRATTO' })
  idContratto: number;

  @JoinColumn({ name: 'ID_CONTRATTO' })
  @ManyToOne(() => ContrComodatoMast, (el) => el.dettagli, {
    orphanedRowAction: 'delete',
  })
  contrattoComodato: ContrComodatoMast;

  @FixedPrimaryColumn('nchar', { name: 'KEY_ART', length: 20 })
  keyArt: string;

  @ManyToOne(() => KeyArti)
  @JoinColumn({ name: 'KEY_ART' })
  codiceRicerca: KeyArti;

  @FixedPrimaryColumn('nchar', { name: 'ARTICOLO', length: 20 })
  codiceArticolo: string;

  @FixedPrimaryColumn('nchar', { name: 'MATRICOLA', length: 50 })
  codiceMatricola: string;

  @ManyToOne(() => Matricol)
  @JoinColumn([
    { name: 'ARTICOLO', referencedColumnName: 'amkeysal' },
    { name: 'MATRICOLA', referencedColumnName: 'amcodice' },
  ])
  matricola: Matricol | null;

  get idMatricola(): string {
    return MatricolaID.compute({
      amkeysal: this.codiceArticolo,
      amcodice: this.codiceMatricola,
    });
  }

  set idMatricola(newId: string) {
    if (newId) {
      this.codiceArticolo = MatricolaID.parse(newId).amkeysal;
      this.codiceMatricola = MatricolaID.parse(newId).amcodice;
    }
  }

  get ID() {
    return ComodatoContrattoDettagliID.compute(this);
  }

  @FixedColumn('nchar', {
    name: 'CONSEGNA_SERIAL_RIF',
    length: 10,
    nullable: true,
  })
  consegnaSerialRif: string | null;

  @Column('int', { name: 'CONSEGNA_RIGA_RIF', nullable: true })
  consegnaRigaRif: number | null;

  @JoinColumn([
    {
      name: 'CONSEGNA_SERIAL_RIF',
      referencedColumnName: 'mvserial',
    },
    {
      name: 'CONSEGNA_RIGA_RIF',
      referencedColumnName: 'cprownum',
    },
  ])
  @ManyToOne(() => DocDett)
  rigaConsegna: DocDett | null;

  get idRigaConsegna(): string | null {
    if (!this.consegnaSerialRif || !this.consegnaRigaRif) {
      return null;
    } else {
      return DocDettID.compute({
        mvserial: this.consegnaSerialRif,
        cprownum: this.consegnaRigaRif,
      });
    }
  }

  set idRigaConsegna(newId: string | null) {
    if (newId) {
      this.consegnaSerialRif = DocDettID.parse(newId).mvserial;
      this.consegnaRigaRif = DocDettID.parse(newId).cprownum;
    } else {
      this.consegnaRigaRif = null;
    }
  }

  @FixedColumn('nchar', {
    name: 'RITIRO_SERIAL_RIF',
    nullable: true,
    length: 10,
  })
  ritiroSerialRif: string | null;

  @Column('int', { name: 'RITIRO_RIGA_RIF', nullable: true })
  ritiroRigaRif: number | null;

  @JoinColumn([
    {
      name: 'RITIRO_SERIAL_RIF',
      referencedColumnName: 'mvserial',
    },
    {
      name: 'RITIRO_RIGA_RIF',
      referencedColumnName: 'cprownum',
    },
  ])
  @ManyToOne(() => DocDett)
  rigaRitiro: DocDett | null;

  get idRigaRitiro(): string | null {
    if (!this.ritiroSerialRif || !this.ritiroRigaRif) {
      return null;
    } else {
      return DocDettID.compute({
        mvserial: this.ritiroSerialRif,
        cprownum: this.ritiroRigaRif,
      });
    }
  }

  set idRigaRitiro(newId: string | null) {
    if (newId) {
      this.ritiroSerialRif = DocDettID.parse(newId).mvserial;
      this.ritiroRigaRif = DocDettID.parse(newId).cprownum;
    } else {
      this.ritiroRigaRif = null;
    }
  }
}
