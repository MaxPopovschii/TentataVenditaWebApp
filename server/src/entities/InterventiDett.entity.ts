import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { InterventiMast } from './InterventiMast.entity';
import { TipiInterventi } from './TipiInterventi.entity';
import { Magazzin } from './Magazzin.entity';
import { ArtIcol } from './ArtIcol.entity';
import {
  InterventoDettagliID,
  TipoologiaInterventoID,
} from '../../../common/src/index';
import { FixedColumn } from '../FixedColumn';
import VersionedEntity from '../VersionedEntity';

@Entity('_COFFEE_INTERVENTI_DETT')
export class InterventiDett extends VersionedEntity {
  @PrimaryColumn('int', { primary: true, name: 'ID_INTERVENTO' })
  idIntervento: number;

  @PrimaryColumn('int', { name: 'RIGA' })
  riga: number;

  get ID() {
    return InterventoDettagliID.compute(this);
  }

  set ID(id: string) {
    const parsedId = InterventoDettagliID.parse(id);
    this.idIntervento = parsedId.idIntervento;
    this.riga = parsedId.riga;
  }

  @ManyToOne(() => InterventiMast, (el) => el.dettagli, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'ID_INTERVENTO' })
  intervento: InterventiMast;

  @FixedColumn('nchar', {
    name: 'TIPO_ATTREZZATURA',
    nullable: true,
    length: 5,
  })
  codiceTipoAttrezzatura: string | null;

  @FixedColumn('nchar', { name: 'TIPO_INTERVENTO', nullable: true, length: 5 })
  codiceTipoIntervento: string | null;

  @JoinColumn([
    {
      name: 'TIPO_ATTREZZATURA',
      referencedColumnName: 'tipoAttrezzatura',
    },
    {
      name: 'TIPO_INTERVENTO',
      referencedColumnName: 'tipoIntervento',
    },
  ])
  tipoIntervento: TipiInterventi | null;

  get idTipoIntervento(): string | null {
    if (!this.codiceTipoAttrezzatura || !this.codiceTipoIntervento) {
      return null;
    } else {
      return TipoologiaInterventoID.compute({
        tipoAttrezzatura: this.codiceTipoAttrezzatura,
        tipoIntervento: this.codiceTipoIntervento,
      });
    }
  }

  set idTipoIntervento(newId: string | null) {
    if (newId) {
      this.codiceTipoAttrezzatura =
        TipoologiaInterventoID.parse(newId).tipoAttrezzatura;
      this.codiceTipoIntervento =
        TipoologiaInterventoID.parse(newId).tipoIntervento;
    } else {
      this.codiceTipoIntervento = null;
    }
  }

  @Column('varchar', { name: 'NOTE', nullable: true, length: 200 })
  note: string | null;

  @FixedColumn('nchar', { name: 'MAGAZZINO', nullable: true, length: 5 })
  codiceMagazzino: string | null;

  @ManyToOne(() => Magazzin)
  @JoinColumn({ name: 'MAGAZZINO' })
  magazzino: Magazzin | null;

  @FixedColumn('nchar', { name: 'CODICE_SERVIZIO', nullable: true, length: 20 })
  codiceServizio: string | null;

  //TODO: Quale significato? c'è lookup di qualche tipo?
  @ManyToOne(() => ArtIcol)
  @JoinColumn({ name: 'CODICE_SERVIZIO' })
  servizio: ArtIcol | null;

  @Column('decimal', { name: 'QTA', nullable: true, precision: 18, scale: 5 })
  qta: number | null;

  @Column('decimal', {
    name: 'PREZZO',
    nullable: true,
    precision: 18,
    scale: 5,
  })
  prezzo: number | null;

  @Column('decimal', { name: 'NETTO', nullable: true, precision: 18, scale: 5 })
  netto: number | null;
}
