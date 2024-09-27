/* eslint-disable prettier/prettier */
import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

export default abstract class VersionedEntity {
  /*@Column('int', { name: 'UTCC', nullable: true, default: () => '(0)' })
  utcc: number | null;

  @Column('int', { name: 'UTCV', nullable: true, default: () => '(0)' })
  utcv: number | null;*/

  @Column('datetime', { name: 'UTDC', nullable: true })
  utdc: Date | null;

  @Column('datetime', { name: 'UTDV', nullable: true })
  utdv: Date | null;
  @BeforeUpdate()
  updateUtdv() {
    this.utdv = new Date();
  }

  @BeforeInsert()
  updateUtdc() {
    this.utdc = new Date();
  }
}
