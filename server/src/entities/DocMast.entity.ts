import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DocDett } from './DocDett.entity';
import { Conti } from './Conti.entity';
import { FixedColumn, FixedPrimaryColumn } from '../FixedColumn';
import VersionedEntity from '../VersionedEntity';
import { ContoID } from '../../../common/src/index';
import { TipoDoc } from './TipoDoc.entity';
import { DesDive } from './DesDive.entity';

@Entity('DOC_MAST')
export class DocMast extends VersionedEntity {
  @FixedPrimaryColumn('nchar', { name: 'MVSERIAL', length: 10 })
  ID: string;

  get humanReadableID() {
    return this.ID;
  }

  @Column('int', { name: 'MVCODUTE', nullable: true, default: () => '(0)' })
  mvcodute: number | null;

  @Column('decimal', {
    name: 'MVNUMREG',
    nullable: true,
    precision: 15,
    scale: 0,
    default: () => '(0)',
  })
  mvnumreg: number | null;

  @Column('date', { name: 'MVDATREG', nullable: true })
  mvdatreg: Date | null;

  @Column('date', { name: 'MVDATPLA', nullable: true })
  mvdatpla: Date | null;

  @FixedColumn('nchar', { name: 'MVTIPDOC', nullable: true, length: 5 })
  mvtipdoc: string | null;
  @JoinColumn({ name: 'MVTIPDOC' })
  @ManyToOne(() => TipoDoc)
  tipoDoc: TipoDoc;

  @FixedColumn('nchar', { name: 'MVCLADOC', nullable: true, length: 2 })
  mvcladoc: string | null;

  @FixedColumn('nchar', { name: 'MVFLVEAC', nullable: true, length: 1 })
  mvflveac: string | null;

  @FixedColumn('nchar', { name: 'MVFLACCO', nullable: true, length: 1 })
  mvflacco: string | null;

  @FixedColumn('nchar', { name: 'MVFLINTE', nullable: true, length: 1 })
  mvflinte: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLPROV',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflprov: string | null;

  @FixedColumn('nchar', { name: 'MVPRD', nullable: true, length: 2 })
  mvprd: string | null;

  @FixedColumn('nchar', { name: 'MVCODESE', nullable: true, length: 4 })
  mvcodese: string | null;

  @FixedColumn('nchar', { name: 'MVPRP', nullable: true, length: 2 })
  mvprp: string | null;

  @Column('decimal', {
    name: 'MVNUMDOC',
    nullable: true,
    precision: 15,
    scale: 0,
    default: () => '(0)',
  })
  mvnumdoc: number | null;

  @FixedColumn('nchar', { name: 'MVALFDOC', nullable: true, length: 10 })
  mvalfdoc: string | null;

  @Column('date', { name: 'MVDATDOC', nullable: true })
  mvdatdoc: Date | null;

  @FixedColumn('nchar', { name: 'MVANNDOC', nullable: true, length: 4 })
  mvanndoc: string | null;

  @FixedColumn('nchar', { name: 'MVANNPRO', nullable: true, length: 4 })
  mvannpro: string | null;

  @Column('decimal', {
    name: 'MVNUMEST',
    nullable: true,
    precision: 15,
    scale: 0,
    default: () => '(0)',
  })
  mvnumest: number | null;

  @FixedColumn('nchar', { name: 'MVALFEST', nullable: true, length: 10 })
  mvalfest: string | null;

  @Column('date', { name: 'MVDATEST', nullable: true })
  mvdatest: Date | null;

  @Column('date', { name: 'MVDATCIV', nullable: true })
  mvdatciv: Date | null;

  @FixedColumn('nchar', { name: 'MVTCONTR', nullable: true, length: 15 })
  mvtcontr: string | null;

  @FixedColumn('nchar', { name: 'MVTCOLIS', nullable: true, length: 5 })
  mvtcolis: string | null;

  @FixedColumn('nchar', { name: 'MVTFRAGG', nullable: true, length: 1 })
  mvtfragg: string | null;

  @FixedColumn('nchar', { name: 'MVTIPCON', nullable: true, length: 1 })
  mvtipcon: string | null;

  @FixedColumn('nchar', { name: 'MVCODCON', nullable: true, length: 15 })
  mvcodcon: string | null;

  @FixedColumn('nchar', { name: 'MVCODDES', nullable: true, length: 5 })
  mvcoddes: string | null;

  @Column('date', { name: 'MVDATDIV', nullable: true })
  mvdatdiv: Date | null;

  @FixedColumn('nchar', { name: 'MVCODBAN', nullable: true, length: 10 })
  mvcodban: string | null;

  @FixedColumn('nchar', { name: 'MVCODBA2', nullable: true, length: 15 })
  mvcodba2: string | null;

  @FixedColumn('nchar', { name: 'MVVALNAZ', nullable: true, length: 3 })
  mvvalnaz: string | null;

  @Column('decimal', {
    name: 'MVCAOVAL',
    nullable: true,
    precision: 12,
    scale: 7,
    default: () => '(0)',
  })
  mvcaoval: number | null;

  @Column('decimal', {
    name: 'MVSCOCL1',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  mvscocl1: number | null;

  @Column('decimal', {
    name: 'MVSCOCL2',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  mvscocl2: number | null;

  @Column('decimal', {
    name: 'MVSCOPAG',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  mvscopag: number | null;

  @FixedColumn('nchar', {
    name: 'MVFLSCOR',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflscor: string | null;

  @FixedColumn('nchar', { name: 'MVFLGIOM', nullable: true, length: 1 })
  mvflgiom: string | null;

  @Column('date', { name: 'MVTINCOM', nullable: true })
  mvtincom: Date | null;

  @Column('date', { name: 'MVTFICOM', nullable: true })
  mvtficom: Date | null;

  @Column('int', { name: 'MVFLGCRM', nullable: true, default: () => '(0)' })
  mvflgcrm: number | null;

  @Column('date', { name: 'MVDATSCA', nullable: true })
  mvdatsca: Date | null;

  @FixedColumn('nchar', { name: 'MVTIPSOG', nullable: true, length: 3 })
  mvtipsog: string | null;

  @FixedColumn('nchar', { name: 'MVPNTCRM', nullable: true, length: 10 })
  mvpntcrm: string | null;

  @Column('int', { name: 'MVLSTYPE', nullable: true, default: () => '(0)' })
  mvlstype: number | null;

  @FixedColumn('nchar', { name: 'MVREVOFF', nullable: true, length: 10 })
  mvrevoff: string | null;

  @FixedColumn('nchar', { name: 'MVSERSTO', nullable: true, length: 10 })
  mvsersto: string | null;

  @Column('int', { name: 'MVSEQSTO', nullable: true, default: () => '(0)' })
  mvseqsto: number | null;

  @Column('int', { name: 'MVLINSTO', nullable: true, default: () => '(1)' })
  mvlinsto: number | null;

  @Column('datetime', { name: 'MVDATINI', nullable: true })
  mvdatini: Date | null;

  @Column('datetime', { name: 'MVDATSTO', nullable: true })
  mvdatsto: Date | null;

  @FixedColumn('nchar', {
    name: 'MVFLANAL',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  mvflanal: string | null;

  @Column('datetime', {
    name: 'cpupdtms',
    nullable: true,
    default: () => 'getdate()',
  })
  cpupdtms: Date | null;

  @FixedColumn('nchar', {
    name: 'MVFLFOSC',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflfosc: string | null;

  @Column('money', { name: 'MVSCONTI', nullable: true, default: () => '(0)' })
  mvsconti: number | null;

  @FixedColumn('nchar', { name: 'MVIVAINC', nullable: true, length: 5 })
  mvivainc: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLRINC',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflrinc: string | null;

  @FixedColumn('nchar', { name: 'MVIVATRA', nullable: true, length: 5 })
  mvivatra: string | null;

  @Column('money', { name: 'MVSPEBOL', nullable: true, default: () => '(0)' })
  mvspebol: number | null;

  @Column('money', { name: 'MVSPETRA', nullable: true, default: () => '(0)' })
  mvspetra: number | null;

  @FixedColumn('nchar', { name: 'MVIVAARR', nullable: true, length: 5 })
  mvivaarr: string | null;

  @FixedColumn('nchar', { name: 'MVIVAIMB', nullable: true, length: 5 })
  mvivaimb: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLRTRA',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflrtra: string | null;

  @FixedColumn('nchar', { name: 'MVIVABOL', nullable: true, length: 5 })
  mvivabol: string | null;

  @Column('money', { name: 'MVIMPARR', nullable: true, default: () => '(0)' })
  mvimparr: number | null;

  @Column('money', { name: 'MVACCPRE', nullable: true, default: () => '(0)' })
  mvaccpre: number | null;

  @Column('money', { name: 'MVTOTRIT', nullable: true, default: () => '(0)' })
  mvtotrit: number | null;

  @Column('int', { name: 'MVMAXACC', nullable: true, default: () => '(0)' })
  mvmaxacc: number | null;

  @FixedColumn('nchar', {
    name: 'MVFLRIMB',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflrimb: string | null;

  @Column('money', { name: 'MVSPEIMB', nullable: true, default: () => '(0)' })
  mvspeimb: number | null;

  @Column('money', { name: 'MVACCSUC', nullable: true, default: () => '(0)' })
  mvaccsuc: number | null;

  @Column('money', { name: 'MVTOTENA', nullable: true, default: () => '(0)' })
  mvtotena: number | null;

  @Column('money', { name: 'MVSPEINC', nullable: true, default: () => '(0)' })
  mvspeinc: number | null;

  @FixedColumn('nchar', { name: 'MVCONCON', nullable: true, length: 3 })
  mvconcon: string | null;

  @Column('int', { name: 'MVQTACOL', nullable: true, default: () => '(0)' })
  mvqtacol: number | null;

  @Column('nvarchar', { name: 'MVASPEST', nullable: true, length: 30 })
  mvaspest: string | null;

  @Column('decimal', {
    name: 'MVQTAPES',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtapes: number | null;

  @FixedColumn('nchar', { name: 'MVCODORN', nullable: true, length: 15 })
  mvcodorn: string | null;

  @Column('nvarchar', { name: 'MVNOTAGG', nullable: true, length: 40 })
  mvnotagg: string | null;

  @Column('decimal', {
    name: 'MVQTALOR',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtalor: number | null;

  @FixedColumn('nchar', { name: 'MVGENEFF', nullable: true, length: 1 })
  mvgeneff: string | null;

  @FixedColumn('nchar', { name: 'MVTIPORN', nullable: true, length: 1 })
  mvtiporn: string | null;

  @FixedColumn('nchar', { name: 'MVGENPRO', nullable: true, length: 1 })
  mvgenpro: string | null;

  @Column('money', { name: 'MVACCONT', nullable: true, default: () => '(0)' })
  mvaccont: number | null;

  @FixedColumn('nchar', { name: 'MVRIFPIA', nullable: true, length: 10 })
  mvrifpia: string | null;

  @FixedColumn('nchar', { name: 'MVRIFCON', nullable: true, length: 10 })
  mvrifcon: string | null;

  @FixedColumn('nchar', { name: 'MVMINTRA', nullable: true, length: 2 })
  mvmintra: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLCONT',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflcont: string | null;

  @FixedColumn('nchar', { name: 'MVRIFACC', nullable: true, length: 10 })
  mvrifacc: string | null;

  @Column('date', { name: 'MVDATTRA', nullable: true })
  mvdattra: Date | null;

  @FixedColumn('nchar', { name: 'MVACIVA5', nullable: true, length: 5 })
  mvaciva5: string | null;

  @FixedColumn('nchar', { name: 'MVACIVA1', nullable: true, length: 5 })
  mvaciva1: string | null;

  @FixedColumn('nchar', { name: 'MVORATRA', nullable: true, length: 2 })
  mvoratra: string | null;

  @FixedColumn('nchar', { name: 'MVACIVA3', nullable: true, length: 5 })
  mvaciva3: string | null;

  @FixedColumn('nchar', { name: 'MVACIVA4', nullable: true, length: 5 })
  mvaciva4: string | null;

  @FixedColumn('nchar', { name: 'MVACIVA2', nullable: true, length: 5 })
  mvaciva2: string | null;

  @FixedColumn('nchar', { name: 'MVRIFFAD', nullable: true, length: 10 })
  mvriffad: string | null;

  @Column('money', { name: 'MVAIMPN1', nullable: true, default: () => '(0)' })
  mvaimpn1: number | null;

  @FixedColumn('nchar', { name: 'MVACIVA6', nullable: true, length: 5 })
  mvaciva6: string | null;

  @Column('money', { name: 'MVAIMPN5', nullable: true, default: () => '(0)' })
  mvaimpn5: number | null;

  @Column('money', { name: 'MVAIMPN6', nullable: true, default: () => '(0)' })
  mvaimpn6: number | null;

  @Column('money', { name: 'MVAIMPN2', nullable: true, default: () => '(0)' })
  mvaimpn2: number | null;

  @Column('money', { name: 'MVAIMPN3', nullable: true, default: () => '(0)' })
  mvaimpn3: number | null;

  @Column('money', { name: 'MVAIMPS6', nullable: true, default: () => '(0)' })
  mvaimps6: number | null;

  @Column('money', { name: 'MVAIMPN4', nullable: true, default: () => '(0)' })
  mvaimpn4: number | null;

  @Column('money', { name: 'MVAIMPS4', nullable: true, default: () => '(0)' })
  mvaimps4: number | null;

  @Column('money', { name: 'MVAIMPS3', nullable: true, default: () => '(0)' })
  mvaimps3: number | null;

  @Column('money', { name: 'MVAIMPS2', nullable: true, default: () => '(0)' })
  mvaimps2: number | null;

  @Column('money', { name: 'MVAIMPS5', nullable: true, default: () => '(0)' })
  mvaimps5: number | null;

  @FixedColumn('nchar', { name: 'MVAFLOM1', nullable: true, length: 1 })
  mvaflom1: string | null;

  @FixedColumn('nchar', { name: 'MVAFLOM2', nullable: true, length: 1 })
  mvaflom2: string | null;

  @FixedColumn('nchar', { name: 'MVAFLOM4', nullable: true, length: 1 })
  mvaflom4: string | null;

  @FixedColumn('nchar', { name: 'MVAFLOM6', nullable: true, length: 1 })
  mvaflom6: string | null;

  @FixedColumn('nchar', { name: 'MVAFLOM3', nullable: true, length: 1 })
  mvaflom3: string | null;

  @Column('money', { name: 'MVAIMPS1', nullable: true, default: () => '(0)' })
  mvaimps1: number | null;

  @FixedColumn('nchar', { name: 'MVAFLOM5', nullable: true, length: 1 })
  mvaflom5: string | null;

  @FixedColumn('nchar', { name: 'MVANNRET', nullable: true, length: 4 })
  mvannret: string | null;

  @FixedColumn('nchar', { name: 'MVTIPPER', nullable: true, length: 1 })
  mvtipper: string | null;

  @Column('int', { name: 'MVPERRET', nullable: true, default: () => '(0)' })
  mvperret: number | null;

  @Column('money', { name: 'MVTRAINT', nullable: true, default: () => '(0)' })
  mvtraint: number | null;

  @Column('nvarchar', { name: 'MV__NOTE', nullable: true })
  mvNote: string | null;

  @FixedColumn('nchar', { name: 'MVFLINTR', nullable: true, length: 1 })
  mvflintr: string | null;

  @FixedColumn('nchar', { name: 'MVFLSALD', nullable: true, length: 1 })
  mvflsald: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLCAPA',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflcapa: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLSCAF',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflscaf: string | null;

  @FixedColumn('nchar', { name: 'MVRIFESP', nullable: true, length: 10 })
  mvrifesp: string | null;

  @FixedColumn('nchar', { name: 'MVMOVCOM', nullable: true, length: 10 })
  mvmovcom: string | null;

  @FixedColumn('nchar', { name: 'MVRIFODL', nullable: true, length: 10 })
  mvrifodl: string | null;

  @FixedColumn('nchar', { name: 'MVRIFDCO', nullable: true, length: 10 })
  mvrifdco: string | null;

  @FixedColumn('nchar', { name: 'MVFLBLOC', nullable: true, length: 1 })
  mvflbloc: string | null;

  @FixedColumn('nchar', { name: 'MVSERDDT', nullable: true, length: 10 })
  mvserddt: string | null;

  @Column('int', { name: 'MVROWDDT', nullable: true, default: () => '(0)' })
  mvrowddt: number | null;

  @Column('nvarchar', { name: 'MVDESDOC', nullable: true, length: 254 })
  mvdesdoc: string | null;

  @FixedColumn('nchar', { name: 'MVFLOFFE', nullable: true, length: 1 })
  mvfloffe: string | null;

  @FixedColumn('nchar', { name: 'MVCODSED', nullable: true, length: 5 })
  mvcodsed: string | null;

  @FixedColumn('nchar', { name: 'MVFLVABD', nullable: true, length: 1 })
  mvflvabd: string | null;

  @Column('money', { name: 'MVACCOLD', nullable: true, default: () => '(0)' })
  mvaccold: number | null;

  @Column('nvarchar', { name: 'MVNUMCOR', nullable: true, length: 25 })
  mvnumcor: string | null;

  @Column('nvarchar', { name: 'MVSERWEB', nullable: true, length: 50 })
  mvserweb: string | null;

  @Column('money', { name: 'MVRITPRE', nullable: true, default: () => '(0)' })
  mvritpre: number | null;

  @Column('decimal', {
    name: 'MVPERFIN',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  mvperfin: number | null;

  @Column('money', { name: 'MVIMPFIN', nullable: true, default: () => '(0)' })
  mvimpfin: number | null;

  @FixedColumn('nchar', {
    name: 'MVFLSFIN',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflsfin: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLSCOM',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflscom: string | null;

  @Column('money', { name: 'MVCAUIMB', nullable: true, default: () => '(0)' })
  mvcauimb: number | null;

  @FixedColumn('nchar', { name: 'MVIVACAU', nullable: true, length: 5 })
  mvivacau: string | null;

  @Column('money', { name: 'MVRITATT', nullable: true, default: () => '(0)' })
  mvritatt: number | null;

  @FixedColumn('nchar', {
    name: 'MVFLFOCA',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflfoca: string | null;

  @FixedColumn('nchar', {
    name: 'MVTIPIMB',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvtipimb: string | null;

  @Column('nvarchar', { name: 'MVSEREST', nullable: true, length: 40 })
  mvserest: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLSEND',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflsend: string | null;

  @Column('int', { name: 'MV__ANNO', nullable: true, default: () => '(0)' })
  mvAnno: number | null;

  @Column('int', { name: 'MV__MESE', nullable: true, default: () => '(0)' })
  mvMese: number | null;

  @FixedColumn('nchar', {
    name: 'MVTIPDIS',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvtipdis: string | null;

  @Column('bit', { name: 'MVGENPOS', nullable: true, default: () => '(0)' })
  mvgenpos: boolean | null;

  @FixedColumn('nchar', {
    name: 'MVSTFILCB',
    nullable: true,
    length: 1,
    default: () => "'1'",
  })
  mvstfilcb: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLGINC',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflginc: string | null;

  @FixedColumn('nchar', { name: 'MVEMERIC', nullable: true, length: 1 })
  mvemeric: string | null;

  @FixedColumn('nchar', { name: 'MVAGG_01', nullable: true, length: 15 })
  mvagg_01: string | null;

  @FixedColumn('nchar', { name: 'MVAGG_02', nullable: true, length: 15 })
  mvagg_02: string | null;

  @FixedColumn('nchar', { name: 'MVAGG_03', nullable: true, length: 15 })
  mvagg_03: string | null;

  @FixedColumn('nchar', { name: 'MVAGG_04', nullable: true, length: 15 })
  mvagg_04: string | null;

  @Column('date', { name: 'MVAGG_05', nullable: true })
  mvagg_05: Date | null;

  @Column('date', { name: 'MVAGG_06', nullable: true })
  mvagg_06: Date | null;

  @FixedColumn('nchar', { name: 'MVRIFPRO', nullable: true, length: 10 })
  mvrifpro: string | null;

  @FixedColumn('nchar', { name: 'MVGENPRE', nullable: true, length: 10 })
  mvgenpre: string | null;

  @Column('nvarchar', { name: 'MVRIFEST', nullable: true, length: 40 })
  mvrifest: string | null;

  @FixedColumn('nchar', {
    name: 'MVNOTRIT',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  mvnotrit: string | null;

  @Column('nvarchar', { name: 'MVNUMFAT', nullable: true, length: 50 })
  mvnumfat: string | null;

  @Column('int', { name: 'MVPRZNET', nullable: true, default: () => '(0)' })
  mvprznet: number | null;

  @FixedColumn('nchar', {
    name: 'MVVARVUO',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  mvvarvuo: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLFOBO',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflfobo: string | null;

  @FixedColumn('nchar', {
    name: 'MVRIPBOL',
    nullable: true,
    length: 1,
    default: () => "'S'",
  })
  mvripbol: string | null;

  @FixedColumn('nchar', { name: 'MVPOSCNT', nullable: true, length: 10 })
  mvposcnt: string | null;

  @FixedColumn('nchar', { name: 'MVPOSSTO', nullable: true, length: 10 })
  mvpossto: string | null;

  @FixedColumn('nchar', { name: 'MVPOSREG', nullable: true, length: 10 })
  mvposreg: string | null;

  @Column('int', { name: 'MVIVABLO', nullable: true, default: () => '(0)' })
  mvivablo: number | null;

  @FixedColumn('nchar', {
    name: 'cpccchk',
    nullable: true,
    length: 10,
    default: () => "'qwertyuiop'",
  })
  cpccchk: string | null;

  @OneToMany(() => DocDett, (demodocDett) => demodocDett.documento)
  righe: DocDett[];

  @ManyToOne(() => Conti)
  @JoinColumn([
    { name: 'MVTIPCON', referencedColumnName: 'antipcon' },
    { name: 'MVCODCON', referencedColumnName: 'ancodice' },
  ])
  conto: Conti;

  get idConto(): string | null {
    if (!this.mvtipcon || !this.mvcodcon) {
      return null;
    } else {
      return ContoID.compute({
        ancodice: this.mvcodcon,
        antipcon: this.mvtipcon,
      });
    }
  }

  set idConto(newId: string | null) {
    if (newId) {
      const x = ContoID.parse(newId);
      this.mvcodcon = x.ancodice;
      this.mvtipcon = x.antipcon;
    } else {
      this.mvcodcon = null;
      this.mvtipcon = null;
    }
  }

  @ManyToOne(() => DesDive)
  @JoinColumn([
    { name: 'MVCODDES', referencedColumnName: 'ddcoddes' },
    { name: 'mvcodcon', referencedColumnName: 'ddcodice' },
    { name: 'mvtipcon', referencedColumnName: 'ddtipcon' },
  ])
  destinazione: DesDive;

  /*
  @OneToMany(() => BaDoccorDemo, (baDoccorDemo) => baDoccorDemo.pcserial2)
  baDoccorS: BaDoccorDemo[];

  @OneToMany(() => CmPntcrmDemo, (cmPntcrmDemo) => cmPntcrmDemo.pnserdcr)
  cmPntcrmS: CmPntcrmDemo[];

  @OneToOne(() => ConPaga, (democonPaga) => democonPaga.cpserial2)
  democonPaga: ConPaga;

  @OneToMany(() => DetDiff, (demodetDiff) => demodetDiff.dpserdoc)
  demodetDiffs: DetDiff[];


  @ManyToOne(() => TipDocu, (demotipDocu) => demotipDocu.demodocMasts)
  @JoinColumn([{ name: 'MVTIPDOC', referencedColumnName: 'tdtipdoc' }])
  mvtipdoc2: TipDocu;

  @ManyToOne(() => PagAmen, (demopagAmen) => demopagAmen.demodocMasts)
  @JoinColumn([{ name: 'MVCODPAG', referencedColumnName: 'pacodice' }])
  mvcodpag: PagAmen;

  @ManyToOne(() => Vettori, (demovettori) => demovettori.demodocMasts)
  @JoinColumn([{ name: 'MVCODVET', referencedColumnName: 'vtcodvet' }])
  mvcodvet: Vettori;

  @ManyToOne(() => Vettori, (demovettori) => demovettori.demodocMasts2)
  @JoinColumn([{ name: 'MVCODVE2', referencedColumnName: 'vtcodvet' }])
  mvcodve: Vettori;

  @ManyToOne(() => Vettori, (demovettori) => demovettori.demodocMasts3)
  @JoinColumn([{ name: 'MVCODVE3', referencedColumnName: 'vtcodvet' }])
  mvcodve2: Vettori;

  @ManyToOne(() => Tipcodiv, (demotipcodiv) => demotipcodiv.demodocMasts)
  @JoinColumn([
    { name: 'MVCATOPE', referencedColumnName: 'tiTipo' },
    { name: 'MVTIPOPE', referencedColumnName: 'ticodice' },
  ])
  demotipcodiv: Tipcodiv;


  @ManyToOne(() => CkAindiriDemo, (ckAindiriDemo) => ckAindiriDemo.demodocMasts)
  @JoinColumn([{ name: 'MVNOMOFF', referencedColumnName: 'cicodice' }])
  mvnomoff: CkAindiriDemo;

  @ManyToOne(() => Vociiva, (demovociiva) => demovociiva.demodocMasts)
  @JoinColumn([{ name: 'MVCODIVE', referencedColumnName: 'ivcodiva' }])
  mvcodive: Vociiva;

  @ManyToOne(() => DicInte, (demodicInte) => demodicInte.demodocMasts)
  @JoinColumn([{ name: 'MVRIFDIC', referencedColumnName: 'diserial' }])
  mvrifdic: DicInte;

  @ManyToOne(() => Aspetto, (demoaspetto) => demoaspetto.demodocMasts)
  @JoinColumn([{ name: 'MVCODASP', referencedColumnName: 'ascodasp' }])
  mvcodasp: Aspetto;

  @ManyToOne(
    () => CmOpportunityDemo,
    (cmOpportunityDemo) => cmOpportunityDemo.demodocMasts,
  )
  @JoinColumn([{ name: 'MVCODOPP', referencedColumnName: 'opoppid' }])
  mvcodopp: CmOpportunityDemo;

  @ManyToOne(() => Metcalsp, (demometcalsp) => demometcalsp.demodocMasts)
  @JoinColumn([{ name: 'MVMCALSI', referencedColumnName: 'mscodice' }])
  mvmcalsi: Metcalsp;

  @ManyToOne(() => Metcalsp, (demometcalsp) => demometcalsp.demodocMasts2)
  @JoinColumn([{ name: 'MVMCIVT1', referencedColumnName: 'mscodice' }])
  mvmcivt: Metcalsp;

  @ManyToOne(() => Metcalsp, (demometcalsp) => demometcalsp.demodocMasts3)
  @JoinColumn([{ name: 'MVMCIVT2', referencedColumnName: 'mscodice' }])
  mvmcivt2: Metcalsp;

  @ManyToOne(() => Metcalsp, (demometcalsp) => demometcalsp.demodocMasts4)
  @JoinColumn([{ name: 'MVMCIVT3', referencedColumnName: 'mscodice' }])
  mvmcivt3: Metcalsp;

  @ManyToOne(() => Metcalsp, (demometcalsp) => demometcalsp.demodocMasts5)
  @JoinColumn([{ name: 'MVMCALST', referencedColumnName: 'mscodice' }])
  mvmcalst: Metcalsp;

  @ManyToOne(() => Metcalsp, (demometcalsp) => demometcalsp.demodocMasts6)
  @JoinColumn([{ name: 'MVMCTVT1', referencedColumnName: 'mscodice' }])
  mvmctvt: Metcalsp;

  @ManyToOne(() => Metcalsp, (demometcalsp) => demometcalsp.demodocMasts7)
  @JoinColumn([{ name: 'MVMCTVT2', referencedColumnName: 'mscodice' }])
  mvmctvt2: Metcalsp;

  @ManyToOne(() => Metcalsp, (demometcalsp) => demometcalsp.demodocMasts8)
  @JoinColumn([{ name: 'MVMCTVT3', referencedColumnName: 'mscodice' }])
  mvmctvt3: Metcalsp;

  @ManyToOne(
    () => BaContactADemo,
    (baContactADemo) => baContactADemo.demodocMasts,
  )
  @JoinColumn([{ name: 'MVPEROFF', referencedColumnName: 'cocompanyid' }])
  mvperoff: BaContactADemo;

  @ManyToOne(
    () => BaContactADemo,
    (baContactADemo) => baContactADemo.demodocMasts2,
  )
  @JoinColumn([{ name: 'MVAZIOFF', referencedColumnName: 'cocompanyid' }])
  mvazioff: BaContactADemo;

  @ManyToOne(() => Agenti, (demoagenti) => demoagenti.demodocMasts)
  @JoinColumn([{ name: 'MVCODAGE', referencedColumnName: 'agcodage' }])
  mvcodage: Agenti;

  @ManyToOne(() => Agenti, (demoagenti) => demoagenti.demodocMasts2)
  @JoinColumn([{ name: 'MVCODAG2', referencedColumnName: 'agcodage' }])
  mvcodag: Agenti;

  @ManyToOne(() => Valute, (demovalute) => demovalute.demodocMasts)
  @JoinColumn([{ name: 'MVCODVAL', referencedColumnName: 'vacodval' }])
  mvcodval: Valute;

  @ManyToOne(() => CamAgaz, (democamAgaz) => democamAgaz.demodocMasts)
  @JoinColumn([{ name: 'MVTCAMAG', referencedColumnName: 'cmcodice' }])
  mvtcamag: CamAgaz;

  @ManyToOne(() => CauCont, (democauCont) => democauCont.demodocMasts)
  @JoinColumn([{ name: 'MVCAUCON', referencedColumnName: 'cccodice' }])
  mvcaucon: CauCont;

  @ManyToOne(() => Porti, (demoporti) => demoporti.demodocMasts)
  @JoinColumn([{ name: 'MVCODPOR', referencedColumnName: 'pocodpor' }])
  mvcodpor: Porti;

  @ManyToOne(() => Modasped, (demomodasped) => demomodasped.demodocMasts)
  @JoinColumn([{ name: 'MVCODSPE', referencedColumnName: 'spcodspe' }])
  mvcodspe: Modasped;

  @ManyToOne(
    () => CmCampagneDemo,
    (cmCampagneDemo) => cmCampagneDemo.demodocMasts,
  )
  @JoinColumn([{ name: 'MVCAMPAGNA', referencedColumnName: 'cacodice' }])
  mvcampagna: CmCampagneDemo;

  @OneToMany(() => DocRate, (demodocRate) => demodocRate.rsserial2)
  demodocRates: DocRate[];

  @OneToMany(() => GenMasdet, (demogenMasdet) => demogenMasdet.gdserdoc)
  demogenMasdets: GenMasdet[];

  @OneToOne(() => Itdomext, (demoitdomext) => demoitdomext.idserial2)
  demoitdomext: Itdomext;

  @OneToMany(() => MopMast, (demomopMast) => demomopMast.mprifdoc2)
  demomopMasts: MopMast[];

  @OneToMany(() => Vdatrite, (demovdatrite) => demovdatrite.drserial2)
  demovdatrites: Vdatrite[];

  @OneToMany(
    () => EtAutoletGesDemo,
    (etAutoletGesDemo) => etAutoletGesDemo.alserial2,
  )
  etAutoletGesS: EtAutoletGesDemo[];

  @OneToOne(() => EtFatretDemo, (etFatretDemo) => etFatretDemo.frserial2)
  etFatretDemo: EtFatretDemo;*/
}
