import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TecnicoID } from '../../../common/src/IDSystem/TecniciID';
import { ContoID } from '../../../common/src';
import { Conti } from './Conti.entity';

@Entity('_COFFEE_INTERVENTI_TECNICI')
export class Tecnici {
  @PrimaryColumn('varchar', { name: 'CODICE', length: 5 })
  codice: string;

  get ID() {
    return TecnicoID.compute(this);
  }

  set ID(id: string) {
    const parseID = TecnicoID.parse(id);
    this.codice = parseID.codice;
  }

  get humanReadableID() {
    return this.codice;
  }

  set humanReadableID(codice: string) {
    this.codice = codice;
  }

  @Column('varchar', { name: 'DESCRIZIONE', length: 50, nullable: true })
  descrizione: string;

  @Column('varchar', { name: 'TIPO', length: 1, nullable: true })
  tipo: string | null;

  @Column('varchar', { name: 'COD_FORN', length: 15, nullable: true })
  codiceFornitore: string | null;

  @Column('varchar', { name: 'MAGAZZINO', length: 5, nullable: true })
  magazzino: string;

  @JoinColumn([
    { name: 'TIPO', referencedColumnName: 'antipcon' },
    { name: 'COD_FORN', referencedColumnName: 'ancodice' },
  ])
  @ManyToOne(() => Conti)
  fornitore: Conti | null;

  get idFornitore(): string | null {
    if (!this.codiceFornitore || !this.tipo) {
      return null;
    } else {
      return ContoID.compute({
        ancodice: this.codiceFornitore,
        antipcon: this.tipo,
      });
    }
  }

  set idFornitore(newId: string | null) {
    if (newId) {
      this.codiceFornitore = ContoID.parse(newId).ancodice;
      this.tipo = ContoID.parse(newId).antipcon;
    } else {
      this.codiceFornitore = null;
      this.tipo = null;
    }
  }
}
