import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Magazzin } from './Magazzin.entity';
import { ArtIcol } from './ArtIcol.entity';
import { FixedColumn, FixedPrimaryColumn } from '../FixedColumn';
import { MatricolaID } from '../../../common/src/index';

@Index('DEMOMATRICOL2', ['amcodart'], {})
@Index('DEMOMATRICOL3', ['amclamat'], {})
@Index('PK_DEMOMATRICOL', ['amkeysal', 'amcodice'], { unique: true })
@Entity('MATRICOL', { schema: 'dbo' })
export class Matricol {
  @FixedPrimaryColumn('nchar', { name: 'AMKEYSAL', length: 20 })
  amkeysal: string;

  @FixedPrimaryColumn('nchar', { name: 'AMCODICE', length: 40 })
  amcodice: string;

  get ID() {
    return MatricolaID.compute(this);
  }
  get humanReadableID() {
    return this.amcodice.toString();
  }

  @FixedColumn('nchar', { name: 'AMCODART', nullable: true, length: 20 })
  amcodart: string | null;

  @FixedColumn('nchar', { name: 'AMCLAMAT', nullable: true, length: 5 })
  amclamat: string | null;

  @Column('date', { name: 'AMDATCRE', nullable: true })
  amdatcre: Date | null;

  @Column('date', { name: 'AMDATSCA', nullable: true })
  amdatsca: Date | null;

  @Column('decimal', {
    name: 'AM_PROGR',
    nullable: true,
    precision: 18,
    scale: 0,
    default: () => '(0)',
  })
  amProgr: number | null;

  @Column('int', { name: 'AM_PRENO', nullable: true, default: () => '(0)' })
  amPreno: number | null;

  @Column('int', { name: 'AM_PRODU', nullable: true, default: () => '(0)' })
  amProdu: number | null;

  @FixedColumn('nchar', { name: 'AMCODUBI', nullable: true, length: 20 })
  amcodubi: string | null;

  @FixedColumn('nchar', { name: 'AMFLCARI', nullable: true, length: 1 })
  amflcari: string | null;

  @Column('int', { name: 'AMPRGMVM', nullable: true, default: () => '(0)' })
  amprgmvm: number | null;

  @FixedColumn('nchar', {
    name: 'cpccchk',
    nullable: true,
    length: 10,
    default: () => "'qwertyuiop'",
  })
  cpccchk: string | null;

  @Column('nchar', { name: 'LNK_MATFOR', length: 100 })
  lnk_matfor: string;

  @FixedColumn('nchar', { name: 'AMCODMAG', nullable: true, length: 5 })
  amcodmag: string;

  @ManyToOne(() => Magazzin)
  @JoinColumn([{ name: 'AMCODMAG' }])
  magazzino: Magazzin;

  @ManyToOne(() => ArtIcol, (demoartIcol) => demoartIcol.matricole)
  @JoinColumn([{ name: 'AMKEYSAL', referencedColumnName: 'ID' }])
  articolo: ArtIcol;

  /*
  @ManyToOne(() => CmtMast, (democmtMast) => democmtMast.demomatricols)
  @JoinColumn([{ name: "AMCLAMAT", referencedColumnName: "cmcodice" }])
  amclamat2: CmtMast;

  @ManyToOne(() => Magazzin, (demomagazzin) => demomagazzin.demomatricols)
  @JoinColumn([{ name: "AMCODMAG", referencedColumnName: "mgcodmag" }])
  amcodmag: Magazzin;

  @ManyToOne(() => CanTier, (democanTier) => democanTier.demomatricols)
  @JoinColumn([{ name: "AMCODCOM", referencedColumnName: "cncodcan" }])
  amcodcom: CanTier;

  @ManyToOne(() => ArtIcol, (demoartIcol) => demoartIcol.demomatricols)
  @JoinColumn([{ name: "AMCODART", referencedColumnName: "arcodart" }])
  amcodart2: ArtIcol;

  @ManyToOne(() => Lottiart, (demolottiart) => demolottiart.demomatricols)
  @JoinColumn([
    { name: "AMCODLOT", referencedColumnName: "locodice" },
    { name: "AMKEYSAL", referencedColumnName: "locodart" },
  ])
  demolottiart: Lottiart;

  @OneToMany(() => Mvloubma, (demomvloubma) => demomvloubma.demomatricol)
  demomvloubmas: Mvloubma[];*/
}
