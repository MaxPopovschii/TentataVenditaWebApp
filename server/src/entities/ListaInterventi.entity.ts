import { FixedColumn } from 'src/FixedColumn';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MatricolaID } from '../../../common/src';

@Entity('_LISTA_INTERVENTI')
export class ListaInterventi {
  @PrimaryColumn('int', { name: 'ID' })
  ID: number;

  @PrimaryColumn('int', { name: 'NUMERO' })
  numero: number;

  @Column('date', { name: 'DATA', nullable: true })
  dataEsecuzione: Date | null;

  @FixedColumn('nchar', { name: 'I/E', nullable: true, length: 1 })
  internoEsterno: string | null;

  @Column('varchar', { name: 'NOME_TECNICO', nullable: true, length: 50 })
  nomeTecnico: string | null;

  @Column('varchar', { name: 'TIPO_RICHIESTA', nullable: true, length: 50 })
  tipoRichiesta: string | null;

  @FixedColumn('nchar', { name: 'ARTICOLO', nullable: true, length: 20 })
  articolo: string | null;

  @FixedColumn('nchar', { name: 'MATRICOLA', nullable: true, length: 40 })
  matricola: string | null;

  @Column('varchar', {
    name: 'MATR_FOR',
    nullable: true,
    length: 40,
  })
  matricolaFornitore: string | null;

  @Column('varchar', { name: 'NOTE_INTERNE', nullable: true, length: 200 })
  noteInterne: string | null;

  @Column('varchar', { name: 'TIPO_INTERVENTO', nullable: true, length: 50 })
  tipoIntervento: string | null;

  @Column('varchar', { name: 'NOTE_INTERVENTO', nullable: true, length: 200 })
  noteIntervento: string | null;

  @Column('decimal', { name: 'COSTO', nullable: true, precision: 18, scale: 5 })
  costo: number | null;

  @Column('nvarchar', { name: 'ARDESART', nullable: true, length: 40 })
  ardesart: string | null;

  @Column('varchar', { name: 'DESCRIZIONE', nullable: true, length: 200 })
  descrizione: string | null;

  get idMatricola(): string | null {
    if (!this.articolo || !this.matricola) {
      return null;
    } else {
      return MatricolaID.compute({
        amkeysal: this.articolo,
        amcodice: this.matricola,
      });
    }
  }

  set idMatricola(newId: string | null) {
    if (newId) {
      this.articolo = MatricolaID.parse(newId).amkeysal;
      this.matricola = MatricolaID.parse(newId).amcodice;
    } else {
      this.matricola = null;
    }
  }
}
