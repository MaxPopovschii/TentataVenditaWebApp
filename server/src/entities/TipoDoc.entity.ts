import { Column, Entity, PrimaryColumn } from 'typeorm';

import VersionedEntity from '../VersionedEntity';
@Entity('TIP_DOCU', { schema: 'dbo' })
export class TipoDoc extends VersionedEntity {
  @PrimaryColumn('varchar', {
    primary: true,
    name: 'TDTIPDOC',
    length: 5,
  })
  tdtipdoc: string;

  @Column('varchar', { name: 'TDDESDOC', nullable: true })
  tddesdoc: string | null;
}
