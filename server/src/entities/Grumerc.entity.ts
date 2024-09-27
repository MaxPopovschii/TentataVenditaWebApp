import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { FixedColumn, FixedPrimaryColumn } from '../FixedColumn';
import VersionedEntity from '../VersionedEntity';

@Entity('GRUMERC')
export class Grumerc extends VersionedEntity {
  @FixedPrimaryColumn('nchar', { name: 'GMCODICE', length: 5 })
  ID: string;

  get humanReadableID() {
    return this.ID;
  }

  @Column('nvarchar', { name: 'GMDESCRI', nullable: true, length: 35 })
  gmdescri: string | null;

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
    (baCatalogDefDemo) => baCatalogDefDemo.ctgrumerin
  )
  baCatalogDefS: BaCatalogDefDemo[];

  @OneToMany(
    () => BaCatalogDefDemo,
    (baCatalogDefDemo) => baCatalogDefDemo.ctgrumerfi
  )
  baCatalogDefS2: BaCatalogDefDemo[];

  @OneToMany(() => ArtIcol, (demoartIcol) => demoartIcol.argrumer)
  demoartIcols: ArtIcol[];

  @OneToMany(() => ConTrad, (democonTrad) => democonTrad.cogrumer2)
  democonTrads: ConTrad[];

  @OneToMany(() => IpRefcclaDemo, (ipRefcclaDemo) => ipRefcclaDemo.rpgrumer)
  ipRefcclaS: IpRefcclaDemo[];*/
}
