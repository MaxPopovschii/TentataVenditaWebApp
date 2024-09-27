import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ArtIcol } from './ArtIcol.entity';
import { FixedColumn } from '../FixedColumn';
import VersionedEntity from '../VersionedEntity';
import { TipiInterventi } from './TipiInterventi.entity';

@Entity('FAM_ARTI', { schema: 'dbo' })
export class FamArti extends VersionedEntity {
  @FixedColumn('nchar', { primary: true, name: 'FACODICE', length: 5 })
  ID: string;

  get humanReadableID() {
    return this.ID;
  }

  @Column('nvarchar', { name: 'FADESCRI', nullable: true, length: 35 })
  fadescri: string | null;

  @Column('datetime', {
    name: 'cpupdtms',
    nullable: true,
    default: () => 'getdate()',
  })
  cpupdtms: Date | null;

  @FixedColumn('nchar', {
    name: 'cpccchk',
    nullable: true,
    length: 10,
    default: () => "'qwertyuiop'",
  })
  cpccchk: string | null;

  /*
  @OneToMany(
    () => BaCatalogDefDemo,
    (baCatalogDefDemo) => baCatalogDefDemo.ctcodfamin
  )
  baCatalogDefS: BaCatalogDefDemo[];

  @OneToMany(
    () => BaCatalogDefDemo,
    (baCatalogDefDemo) => baCatalogDefDemo.ctcodfamfi
  )
  baCatalogDefS2: BaCatalogDefDemo[];
    */

  @OneToMany(() => ArtIcol, (demoartIcol) => demoartIcol.arcodfam)
  demoartIcols: ArtIcol[];

  @OneToMany(() => TipiInterventi, (t) => t.famArti)
  interventi: TipiInterventi[];
  /*
  @OneToMany(() => IpRefcclaDemo, (ipRefcclaDemo) => ipRefcclaDemo.rpcodfam)
  ipRefcclaS: IpRefcclaDemo[];*/
}
