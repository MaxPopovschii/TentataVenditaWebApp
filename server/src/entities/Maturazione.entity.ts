import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MaturID } from '../../../common/src';

@Entity('_MATURAZIONI_SALDATE')
export class Maturazioni {
  @PrimaryColumn('nchar', { name: 'chius_PTSERIAL', length: 10 })
  serial: string;

  @PrimaryColumn('int', { name: 'chius_PTROWORD' })
  numRow: number;

  @Column('date', { name: 'PNDATREG', nullable: true })
  dataReg: Date | null;

  @Column('nchar', { name: 'MPSERIAL', length: 210, nullable: true })
  mpSerial: string;

  @Column('int', { name: 'riga_prov', nullable: true })
  rigaProv: number | null;

  @Column('nvarchar', { name: 'chius_PTNUMPAR', length: 131, nullable: true })
  numberPar: string | null;

  @Column('nchar', { name: 'chius_PTCODCON', length: 215, nullable: true })
  codiceCon: string | null;

  @Column('nchar', { name: 'chius_MODPAG', length: 210, nullable: true })
  modPag: string | null;

  @Column('money', { name: 'chius_PTTOTIMP', nullable: true })
  totImpCh: number | null;

  @Column('nvarchar', { name: 'chius_PTNUMFAT', nullable: true, length: 250 })
  numFat: string | null;

  @Column('date', { name: 'chius_PTDATDOC' })
  dataDoc: Date | null;

  @Column('nchar', { name: 'chius_PTSERRIF', length: 210, nullable: true })
  serRif: string | null;

  @Column('int', { name: 'chius_PTORDRIF', nullable: true })
  ordRif: number | null;

  @Column('nchar', { name: 'chius_PTCODAGE', nullable: true, length: 25 })
  codAge: string | null;

  @Column('nchar', { name: 'ape_PTSERIAL', nullable: true, length: 210 })
  ptSerial: string | null;

  get ID() {
    return MaturID.compute(this);
  }

  set ID(id: string) {
    const parseID = MaturID.parse(id);
    this.ptSerial = parseID.mpSerial;
    this.numRow = parseID.numRow;
  }

  @Column('int', { name: 'ape_PTROWORD' })
  wordAp: number | null;

  @Column('decimal', {
    name: 'ape_PTNUMDOC',
    nullable: true,
    precision: 15,
    scale: 0,
  })
  numDoc: number | null;

  @Column('nchar', { name: 'ape_PTALFDOC', length: 210 })
  alfDoc: string | null;

  @PrimaryColumn('nchar', { name: 'ape_MODPAG', length: 210 })
  modPagApe: string | null;

  @Column('date', { name: 'ape_PTDATDOC' })
  dataDocApe: Date | null;

  @Column('nchar', { name: 'PNSERIAL', length: 210, nullable: true })
  serialN: string | null;

  @Column('int', { name: 'NUMPNT', nullable: true })
  numPnt: number | null;

  @Column('int', { name: 'MPNUMREG', nullable: true })
  mpNumReg: number | null;

  @Column('int', { name: 'CPROWNUM', nullable: true })
  prov: number | null;

  @Column('nchar', { name: 'MPAGECAP', length: 25, nullable: true })
  ageCap: string | null;

  @PrimaryColumn('date', { name: 'MPDATSCA' })
  dataSca: Date | null;

  @Column('nchar', { name: 'MPTIPMAT', length: 22, nullable: true })
  tipMat: string | null;

  @Column('date', { name: 'MPDATMAT', nullable: true })
  dataMat: Date | null;

  @Column('nvarchar', { name: 'AGDESAGE', length: 260, nullable: true })
  desAge: string | null;

  @Column('nvarchar', { name: 'ANDESCRI', length: 260, nullable: true })
  descrizione: string | null;

  @Column('money', { name: 'MPTOTIMP', nullable: true })
  totImp: number | null;

  @Column('decimal', {
    name: 'MPPERPRA',
    nullable: true,
    precision: 5,
    scale: 2,
  })
  perPra: number | null;

  @Column('money', { name: 'MPTOTAGE', nullable: true })
  totAge: number | null;
}
