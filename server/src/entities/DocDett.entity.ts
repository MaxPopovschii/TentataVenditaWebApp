import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DocMast } from './DocMast.entity';
import { FixedPrimaryColumn, FixedColumn } from '../FixedColumn';
import { DocDettID } from '../../../common/src/index';
import { ArtIcol } from './ArtIcol.entity';

@Entity('DOC_DETT')
export class DocDett {
  @FixedPrimaryColumn('nchar', { name: 'MVSERIAL', length: 10 })
  mvserial: string;

  @PrimaryColumn('int', { name: 'CPROWNUM', default: () => '(0)' })
  cprownum: number;

  get ID() {
    return DocDettID.compute(this);
  }
  get humanReadableID() {
    return this.cprownum.toString();
  }

  @Column('int', { name: 'CPROWORD', nullable: true, default: () => '(0)' })
  cproword: number | null;

  @Column('int', { primary: true, name: 'MVNUMRIF', default: () => '(0)' })
  mvnumrif: number;

  @FixedColumn('nchar', { name: 'MVCODICE', nullable: true, length: 20 })
  mvcodice: string | null;

  @FixedColumn('nchar', { name: 'MVTIPRIG', nullable: true, length: 1 })
  mvtiprig: string | null;

  @Column('nvarchar', { name: 'MVDESART', nullable: true, length: 40 })
  mvdesart: string | null;

  @FixedColumn('nchar', { name: 'MVCODART', nullable: true, length: 20 })
  mvcodart: string | null;
  @JoinColumn({ name: 'MVCODART' })
  @ManyToOne(() => ArtIcol)
  articolo: ArtIcol;

  @Column('nvarchar', { name: 'MVDESSUP', nullable: true })
  mvdessup: string | null;

  @Column('decimal', {
    name: 'MVQTAMOV',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtamov: number | null;

  @Column('decimal', {
    name: 'MVQTAUM1',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtaum1: number | null;

  @Column('decimal', {
    name: 'MVPREZZO',
    nullable: true,
    precision: 18,
    scale: 5,
    default: () => '(0)',
  })
  mvprezzo: number | null;

  @Column('decimal', {
    name: 'MVSCONT1',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  mvscont1: number | null;

  @Column('decimal', {
    name: 'MVSCONT2',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  mvscont2: number | null;

  @Column('decimal', {
    name: 'MVSCONT3',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  mvscont3: number | null;

  @Column('decimal', {
    name: 'MVSCONT4',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  mvscont4: number | null;

  @Column('nvarchar', {
    name: 'MVSCONTN',
    nullable: true,
    length: 200,
    default: () => "' '",
  })
  mvscontn: string | null;

  @FixedColumn('nchar', { name: 'MVFLOMAG', nullable: true, length: 1 })
  mvflomag: string | null;

  @Column('money', { name: 'MVVALRIG', nullable: true, default: () => '(0)' })
  mvvalrig: number | null;

  @Column('money', { name: 'MVIMPACC', nullable: true, default: () => '(0)' })
  mvimpacc: number | null;

  @Column('money', { name: 'MVVALMAG', nullable: true, default: () => '(0)' })
  mvvalmag: number | null;

  @Column('money', { name: 'MVIMPNAZ', nullable: true, default: () => '(0)' })
  mvimpnaz: number | null;

  @Column('money', { name: 'MVIMPSCO', nullable: true, default: () => '(0)' })
  mvimpsco: number | null;

  @FixedColumn('nchar', { name: 'MVFLCASC', nullable: true, length: 1 })
  mvflcasc: string | null;

  @FixedColumn('nchar', { name: 'MVF2CASC', nullable: true, length: 1 })
  mvf2Casc: string | null;

  @FixedColumn('nchar', { name: 'MVKEYSAL', nullable: true, length: 20 })
  mvkeysal: string | null;

  @FixedColumn('nchar', { name: 'MVF2ORDI', nullable: true, length: 1 })
  mvf2Ordi: string | null;

  @FixedColumn('nchar', { name: 'MVFLORDI', nullable: true, length: 1 })
  mvflordi: string | null;

  @FixedColumn('nchar', { name: 'MVF2IMPE', nullable: true, length: 1 })
  mvf2Impe: string | null;

  @FixedColumn('nchar', { name: 'MVFLIMPE', nullable: true, length: 1 })
  mvflimpe: string | null;

  @FixedColumn('nchar', { name: 'MVF2RISE', nullable: true, length: 1 })
  mvf2Rise: string | null;

  @FixedColumn('nchar', { name: 'MVFLRISE', nullable: true, length: 1 })
  mvflrise: string | null;

  @Column('decimal', {
    name: 'MVPERPRO',
    nullable: true,
    precision: 5,
    scale: 2,
    default: () => '(0)',
  })
  mvperpro: number | null;

  @Column('money', { name: 'MVIMPPRO', nullable: true, default: () => '(0)' })
  mvimppro: number | null;

  @Column('decimal', {
    name: 'MVPESNET',
    nullable: true,
    precision: 9,
    scale: 3,
    default: () => '(0)',
  })
  mvpesnet: number | null;

  @FixedColumn('nchar', { name: 'MVFLTRAS', nullable: true, length: 1 })
  mvfltras: string | null;

  @FixedColumn('nchar', { name: 'MVNOMENC', nullable: true, length: 8 })
  mvnomenc: string | null;

  @FixedColumn('nchar', { name: 'MVUMSUPP', nullable: true, length: 3 })
  mvumsupp: string | null;

  @FixedColumn('nchar', { name: 'MVNAZPRO', nullable: true, length: 3 })
  mvnazpro: string | null;

  @Column('decimal', {
    name: 'MVMOLSUP',
    nullable: true,
    precision: 8,
    scale: 3,
    default: () => '(0)',
  })
  mvmolsup: number | null;

  @FixedColumn('nchar', { name: 'MVPROORD', nullable: true, length: 2 })
  mvproord: string | null;

  @Column('int', { name: 'MVNUMCOL', nullable: true, default: () => '(0)' })
  mvnumcol: number | null;

  @FixedColumn('nchar', { name: 'MVTIPCOL', nullable: true, length: 20 })
  mvtipcol: string | null;

  @FixedColumn('nchar', { name: 'MVCODCOM', nullable: true, length: 15 })
  mvcodcom: string | null;

  @Column('decimal', {
    name: 'MVQTAEVA',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtaeva: number | null;

  @Column('decimal', {
    name: 'MVQTAEV1',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtaev1: number | null;

  @FixedColumn('nchar', { name: 'MVFLRAGG', nullable: true, length: 1 })
  mvflragg: string | null;

  @Column('decimal', {
    name: 'MVIMPEVA',
    nullable: true,
    precision: 18,
    scale: 5,
    default: () => '(0)',
  })
  mvimpeva: number | null;

  @Column('decimal', {
    name: 'MVQTASAL',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtasal: number | null;

  @Column('date', { name: 'MVEFFEVA', nullable: true })
  mveffeva: Date | null;

  @Column('date', { name: 'MVDATEVA', nullable: true })
  mvdateva: Date | null;

  @FixedColumn('nchar', { name: 'MVFLELGM', nullable: true, length: 1 })
  mvflelgm: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLEVAS',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  mvflevas: string | null;

  @Column('int', { name: 'MVROWRIF', nullable: true, default: () => '(0)' })
  mvrowrif: number | null;

  @FixedColumn('nchar', { name: 'MVSERRIF', nullable: true, length: 10 })
  mvserrif: string | null;

  @Column('decimal', {
    name: 'MVQTANOC',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtanoc: number | null;

  @FixedColumn('nchar', { name: 'MVFLARIF', nullable: true, length: 1 })
  mvflarif: string | null;

  @FixedColumn('nchar', { name: 'MVFLRESC', nullable: true, length: 1 })
  mvflresc: string | null;

  @FixedColumn('nchar', { name: 'MVFLERIF', nullable: true, length: 1 })
  mvflerif: string | null;

  @Column('decimal', {
    name: 'MVQTARES',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtares: number | null;

  @FixedColumn('nchar', { name: 'MVCODCOS', nullable: true, length: 5 })
  mvcodcos: string | null;

  @FixedColumn('nchar', { name: 'MVFLRIAP', nullable: true, length: 1 })
  mvflriap: string | null;

  @Column('money', { name: 'MVPRECON', nullable: true, default: () => '(0)' })
  mvprecon: number | null;

  @FixedColumn('nchar', { name: 'MVFLORCO', nullable: true, length: 1 })
  mvflorco: string | null;

  @FixedColumn('nchar', { name: 'MVFLCOCO', nullable: true, length: 1 })
  mvflcoco: string | null;

  @FixedColumn('nchar', { name: 'MVFLULPV', nullable: true, length: 1 })
  mvflulpv: string | null;

  @FixedColumn('nchar', { name: 'MVFLULCA', nullable: true, length: 1 })
  mvflulca: string | null;

  @Column('money', { name: 'MVIMPCOM', nullable: true, default: () => '(0)' })
  mvimpcom: number | null;

  @Column('money', { name: 'MVVALULT', nullable: true, default: () => '(0)' })
  mvvalult: number | null;

  @Column('date', { name: 'MVINICOM', nullable: true })
  mvinicom: Date | null;

  @Column('date', { name: 'MVDATGEN', nullable: true })
  mvdatgen: Date | null;

  @Column('date', { name: 'MVFINCOM', nullable: true })
  mvfincom: Date | null;

  @FixedColumn('nchar', { name: 'MVRIFORD', nullable: true, length: 10 })
  mvriford: string | null;

  @FixedColumn('nchar', { name: 'MVCODATT', nullable: true, length: 15 })
  mvcodatt: string | null;

  @FixedColumn('nchar', { name: 'MVCODCEN', nullable: true, length: 15 })
  mvcodcen: string | null;

  @FixedColumn('nchar', { name: 'MVCODODL', nullable: true, length: 15 })
  mvcododl: string | null;

  @FixedColumn('nchar', { name: 'MVVOCCEN', nullable: true, length: 15 })
  mvvoccen: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLRIPA',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  mvflripa: string | null;

  @Column('money', { name: 'MVIMPRBA', nullable: true, default: () => '(0)' })
  mvimprba: number | null;

  @FixedColumn('nchar', { name: 'MVFLELAN', nullable: true, length: 1 })
  mvflelan: string | null;

  @FixedColumn('nchar', { name: 'MVRIFESC', nullable: true, length: 10 })
  mvrifesc: string | null;

  @Column('int', { name: 'MVRIGMAT', nullable: true, default: () => '(0)' })
  mvrigmat: number | null;

  @FixedColumn('nchar', { name: 'MVF2LOTT', nullable: true, length: 1 })
  mvf2Lott: string | null;

  @FixedColumn('nchar', { name: 'MVFLLOTT', nullable: true, length: 1 })
  mvfllott: string | null;

  @FixedColumn('nchar', { name: 'MVCODLOT', nullable: true, length: 20 })
  mvcodlot: string | null;

  @FixedColumn('nchar', { name: 'MVCODUB2', nullable: true, length: 20 })
  mvcodub2: string | null;

  @FixedColumn('nchar', {
    name: 'MV_FLAGG',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvFlagg: string | null;

  @FixedColumn('nchar', { name: 'MVFLRVCL', nullable: true, length: 1 })
  mvflrvcl: string | null;

  @FixedColumn('nchar', { name: 'MVCODUBI', nullable: true, length: 20 })
  mvcodubi: string | null;

  @Column('decimal', {
    name: 'MVQTAIM1',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtaim1: number | null;

  @FixedColumn('nchar', {
    name: 'MVTIPPRO',
    nullable: true,
    length: 2,
    default: () => "'DC'",
  })
  mvtippro: string | null;

  @FixedColumn('nchar', {
    name: 'MV_SEGNO',
    nullable: true,
    length: 1,
    default: () => "'D'",
  })
  mvSegno: string | null;

  @FixedColumn('nchar', { name: 'MVCODCES', nullable: true, length: 20 })
  mvcodces: string | null;

  @FixedColumn('nchar', {
    name: 'MVCESSER',
    nullable: true,
    length: 10,
    default: () => "'          '",
  })
  mvcesser: string | null;

  @Column('decimal', {
    name: 'MVQTAIMP',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  mvqtaimp: number | null;

  @Column('money', { name: 'MVIMPAC2', nullable: true, default: () => '(0)' })
  mvimpac2: number | null;

  @FixedColumn('nchar', { name: 'MVUNILOG', nullable: true, length: 18 })
  mvunilog: string | null;

  @Column('decimal', {
    name: 'MVPROCAP',
    nullable: true,
    precision: 5,
    scale: 2,
    default: () => '(0)',
  })
  mvprocap: number | null;

  @Column('money', { name: 'MVIMPCAP', nullable: true, default: () => '(0)' })
  mvimpcap: number | null;

  @FixedColumn('nchar', {
    name: 'MVTIPPR2',
    nullable: true,
    length: 2,
    default: () => "'DC'",
  })
  mvtippr2: string | null;

  @FixedColumn('nchar', {
    name: 'MVFLNOAN',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvflnoan: string | null;

  @FixedColumn('nchar', { name: 'MVMC_PER', nullable: true, length: 3 })
  mvmcPer: string | null;

  @Column('date', { name: 'MVDATOAI', nullable: true })
  mvdatoai: Date | null;

  @Column('date', { name: 'MVDATOAF', nullable: true })
  mvdatoaf: Date | null;

  @FixedColumn('nchar', { name: 'MVPAEFOR', nullable: true, length: 3 })
  mvpaefor: string | null;

  @FixedColumn('nchar', { name: 'MVAIRPOR', nullable: true, length: 10 })
  mvairpor: string | null;

  @Column('nvarchar', { name: 'MVRIFEDI', nullable: true, length: 40 })
  mvrifedi: string | null;

  @FixedColumn('nchar', { name: 'MVCODRES', nullable: true, length: 5 })
  mvcodres: string | null;

  @Column('int', { name: 'MVRIFCAC', nullable: true, default: () => '(0)' })
  mvrifcac: number | null;

  @FixedColumn('nchar', { name: 'MVCACONT', nullable: true, length: 5 })
  mvcacont: string | null;

  @FixedColumn('nchar', {
    name: 'MVLOTMAG',
    nullable: true,
    length: 5,
    default: () => "'     '",
  })
  mvlotmag: string | null;

  @FixedColumn('nchar', {
    name: 'MVLOTMAT',
    nullable: true,
    length: 5,
    default: () => "'     '",
  })
  mvlotmat: string | null;

  @Column('int', { name: 'MVRIFPRE', nullable: true, default: () => '(0)' })
  mvrifpre: number | null;

  @FixedColumn('nchar', {
    name: 'MVRIGPRE',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvrigpre: string | null;

  @Column('int', { name: 'MVROWWEB', nullable: true, default: () => '(0)' })
  mvrowweb: number | null;

  @FixedColumn('nchar', {
    name: 'MVRIGBOL',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mvrigbol: string | null;

  @FixedColumn('nchar', { name: 'MVRISPOS', nullable: true, length: 10 })
  mvrispos: string | null;

  @Column('int', { name: 'MVROWPOS', nullable: true, default: () => '(0)' })
  mvrowpos: number | null;

  @FixedColumn('nchar', { name: 'MVPROMOT', nullable: true, length: 10 })
  mvpromot: string | null;

  @FixedColumn('nchar', {
    name: 'cpccchk',
    nullable: true,
    length: 10,
    default: () => "'qwertyuiop'",
  })
  cpccchk: string | null;
  @Column('char')
  mvunimis: string | null;

  @ManyToOne(() => DocMast, (demodocMast) => demodocMast.righe)
  @JoinColumn([{ name: 'MVSERIAL', referencedColumnName: 'ID' }])
  documento: DocMast;

  /*
  @ManyToOne(() => Cacoarti, (democacoarti) => democacoarti.demodocDetts)
  @JoinColumn([{ name: "MVCATCON", referencedColumnName: "c1Codice" }])
  mvcatcon: Cacoarti;

  @ManyToOne(() => MaCosti, (demomaCosti) => demomaCosti.demodocDetts)
  @JoinColumn([
    { name: "MVCODCOM", referencedColumnName: "cscodcom" },
    { name: "MVTIPATT", referencedColumnName: "cstipstr" },
    { name: "MVCODATT", referencedColumnName: "cscodmat" },
    { name: "MVCODCOS", referencedColumnName: "cscodcos" },
  ])
  demomaCosti: MaCosti;

  @ManyToOne(() => Listini, (demolistini) => demolistini.demodocDetts)
  @JoinColumn([{ name: "MVCODLIS", referencedColumnName: "lscodlis" }])
  mvcodlis: Listini;

  @ManyToOne(() => Cencost, (democencost) => democencost.demodocDetts)
  @JoinColumn([{ name: "MVCODCEN", referencedColumnName: "ccConto" }])
  mvcodcen2: Cencost;

  @ManyToOne(() => VocCost, (demovocCost) => demovocCost.demodocDetts)
  @JoinColumn([{ name: "MVVOCCEN", referencedColumnName: "vccodice" }])
  mvvoccen2: VocCost;

  @ManyToOne(() => ClaRigd, (democlaRigd) => democlaRigd.demodocDetts)
  @JoinColumn([{ name: "MVCODCLA", referencedColumnName: "trcodcla" }])
  mvcodcla: ClaRigd;

  @ManyToOne(() => Unimis, (demounimis) => demounimis.demodocDetts)
  @JoinColumn([{ name: "MVUNIMIS", referencedColumnName: "umcodice" }])
  mvunimis: Unimis;

  @ManyToOne(() => Vociiva, (demovociiva) => demovociiva.demodocDetts)
  @JoinColumn([{ name: "MVCODIVA", referencedColumnName: "ivcodiva" }])
  mvcodiva: Vociiva;

  @ManyToOne(() => ConTram, (democonTram) => democonTram.demodocDetts)
  @JoinColumn([{ name: "MVCONTRA", referencedColumnName: "conumero" }])
  mvcontra: ConTram;

  @ManyToOne(() => TipColl, (demotipColl) => demotipColl.demodocDetts)
  @JoinColumn([{ name: "MVCODCOL", referencedColumnName: "tccodice" }])
  mvcodcol: TipColl;

  @ManyToOne(() => CanTier, (democanTier) => democanTier.demodocDetts)
  @JoinColumn([{ name: "MVCODCOM", referencedColumnName: "cncodcan" }])
  mvcodcom2: CanTier;

  @ManyToOne(() => Magazzin, (demomagazzin) => demomagazzin.demodocDetts)
  @JoinColumn([{ name: "MVCODMAT", referencedColumnName: "mgcodmag" }])
  mvcodmat: Magazzin;

  @ManyToOne(() => Magazzin, (demomagazzin) => demomagazzin.demodocDetts2)
  @JoinColumn([{ name: "MVCODMAG", referencedColumnName: "mgcodmag" }])
  mvcodmag: Magazzin;

  @ManyToOne(() => Conti, (democonti) => democonti.demodocDetts)
  @JoinColumn([
    { name: "MVTIPO_G", referencedColumnName: "antipcon" },
    { name: "MVCONTRO", referencedColumnName: "ancodice" },
  ])
  democonti: Conti;

  @ManyToOne(() => Conti, (democonti) => democonti.demodocDetts2)
  @JoinColumn([
    { name: "MVTIPO_G", referencedColumnName: "antipcon" },
    { name: "MVCONIND", referencedColumnName: "ancodice" },
  ])
  democonti2: Conti;

  @ManyToOne(() => CamAgaz, (democamAgaz) => democamAgaz.demodocDetts)
  @JoinColumn([{ name: "MVCAUCOL", referencedColumnName: "cmcodice" }])
  mvcaucol: CamAgaz;

  @ManyToOne(() => CamAgaz, (democamAgaz) => democamAgaz.demodocDetts2)
  @JoinColumn([{ name: "MVCAUMAG", referencedColumnName: "cmcodice" }])
  mvcaumag: CamAgaz;

  @ManyToOne(() => Attivita, (demoattivita) => demoattivita.demodocDetts)
  @JoinColumn([
    { name: "MVCODCOM", referencedColumnName: "atcodcom" },
    { name: "MVTIPATT", referencedColumnName: "attipatt" },
    { name: "MVCODATT", referencedColumnName: "atcodatt" },
  ])
  demoattivita: Attivita;

  @OneToOne(() => Itdodext, (demoitdodext) => demoitdodext.demodocDett)
  demoitdodext: Itdodext;*/
}
