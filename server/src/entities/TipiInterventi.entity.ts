import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FamArti } from './FamArti.entity';
import { TipoologiaInterventoID } from '../../../common/src/index';
import VersionedEntity from '../VersionedEntity';
@Entity('_COFFEE_TIPI_INTERVENTI', { schema: 'dbo' })
export class TipiInterventi extends VersionedEntity {
  @PrimaryColumn('varchar', {
    primary: true,
    name: 'TIPO_ATTREZZATURA',
    length: 5,
  })
  tipoAttrezzatura: string;

  @PrimaryColumn('varchar', {
    primary: true,
    name: 'TIPO_INTERVENTO',
    length: 5,
  })
  tipoIntervento: string;

  get ID() {
    return TipoologiaInterventoID.compute(this);
  }

  set ID(id: string) {
    const parsedId = TipoologiaInterventoID.parse(id);
    this.tipoAttrezzatura = parsedId.tipoAttrezzatura;
    this.tipoIntervento = parsedId.tipoIntervento;
  }

  get humanReadableID() {
    return this.tipoIntervento;
  }

  @JoinColumn({ name: 'TIPO_ATTREZZATURA', referencedColumnName: 'ID' })
  @ManyToOne(() => FamArti, (x) => x.interventi)
  famArti: FamArti;

  @Column('varchar', { name: 'DESCRIZIONE', nullable: true, length: 50 })
  descrizione: string | null;

  @Column('decimal', { name: 'COSTO', nullable: true, precision: 18, scale: 5 })
  costo: number | null;
}
