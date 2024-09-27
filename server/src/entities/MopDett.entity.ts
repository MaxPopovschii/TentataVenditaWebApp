import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MaturID } from '../../../common/src';

@Entity('MOP_DETT')
export class MopDett {
  @PrimaryColumn('nchar', { name: 'MPSERIAL', length: 10 })
  mpSerial: string;

  @PrimaryColumn('int', { name: 'CPROWNUM' })
  numRow: number;

  get ID() {
    return MaturID.compute(this);
  }

  set ID(id: string) {
    const parseID = MaturID.parse(id);
    this.mpSerial = parseID.mpSerial;
    this.numRow = parseID.numRow;
  }

  @Column('nchar', { name: 'MPAGECAP', length: 5, nullable: true })
  ageCap: string | null;

  @Column('date', { name: 'MPDATSCA', nullable: true })
  dataSca: Date | null;

  @Column('date', { name: 'MPDATMAT', nullable: true })
  dataMat: Date | null;

  @Column('money', { name: 'MPTOTIMP', nullable: true })
  totImp: number | null;

  @Column('decimal', {
    name: 'MPPERPRC',
    nullable: true,
    precision: 5,
    scale: 2,
  })
  perPrc: number | null;

  @Column('decimal', {
    name: 'MPPERPRA',
    nullable: true,
    precision: 5,
    scale: 2,
  })
  perPra: number | null;

  @Column('money', { name: 'MPTOTAGE', nullable: true })
  totAge: number | null;

  @Column('money', { name: 'MPTOTZON', nullable: true })
  totZon: number | null;

  @Column('nchar', { name: 'MPTIPMAT', nullable: true, length: 2 })
  tipMat: string | null;

  @Column('nchar', { name: 'MPFLSOSP', nullable: true, length: 1 })
  flsOsp: string | null;

  @Column('date', { name: 'MPDATLIQ', nullable: true })
  dateLiq: Date | null;

  @Column('nchar', { name: 'MPANNLIQ', nullable: true, length: 4 })
  pannLiq: string | null;

  @Column('int', { name: 'MPLIQAGE', nullable: true })
  liqAge: number | null;

  @Column('int', { name: 'MPLIQCAP', nullable: true })
  liqCap: number | null;

  @Column('money', { name: 'MPTOTIM2', nullable: true })
  totImp2: number | null;

  @Column('nchar', { name: 'cpccchk', nullable: true, length: 10 })
  cpccchk: string;
}
