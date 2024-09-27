import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { FamArti } from './FamArti.entity';
import { Matricol } from './Matricol.entity';
import { FixedColumn, FixedPrimaryColumn } from '../FixedColumn';
import VersionedEntity from '../VersionedEntity';
import { ListaInterventi } from './ListaInterventi.entity';

@Entity('ART_ICOL')
export class ArtIcol extends VersionedEntity {
  @FixedPrimaryColumn('nchar', {
    name: 'ARCODAR2',
    length: 50,
    unique: true,
  })
  ID: string;

  get humanReadableID() {
    return this.ID;
  }

  @Column('nchar', { primary: true, name: 'ARCODART', length: 20 })
  arcodart: string;

  @Column('nvarchar', { name: 'ARDESART', nullable: true, length: 40 })
  ardesart: string | null;

  @Column('nvarchar', { name: 'ARDESSUP', nullable: true })
  ardessup: string | null;

  @FixedColumn('nchar', { name: 'AROPERAT', nullable: true, length: 1 })
  aroperat: string | null;

  @Column('decimal', {
    name: 'ARMOLTIP',
    nullable: true,
    precision: 10,
    scale: 4,
    default: () => '(0)',
  })
  armoltip: number | null;

  @FixedColumn('nchar', { name: 'ARFLINVE', nullable: true, length: 1 })
  arflinve: string | null;

  @FixedColumn('nchar', { name: 'ARTIPART', nullable: true, length: 2 })
  artipart: string | null;

  @FixedColumn('nchar', { name: 'ARTIPPKR', nullable: true, length: 2 })
  artippkr: string | null;

  @Column('decimal', {
    name: 'ARPESNET',
    nullable: true,
    precision: 9,
    scale: 3,
    default: () => '(0)',
  })
  arpesnet: number | null;

  @Column('decimal', {
    name: 'ARPESNE2',
    nullable: true,
    precision: 9,
    scale: 3,
    default: () => '(0)',
  })
  arpesne2: number | null;

  @Column('decimal', {
    name: 'ARPESLOR',
    nullable: true,
    precision: 9,
    scale: 3,
    default: () => '(0)',
  })
  arpeslor: number | null;

  @Column('decimal', {
    name: 'ARPESLO2',
    nullable: true,
    precision: 9,
    scale: 3,
    default: () => '(0)',
  })
  arpeslo2: number | null;

  @FixedColumn('nchar', { name: 'ARDESVOL', nullable: true, length: 15 })
  ardesvol: string | null;

  @FixedColumn('nchar', { name: 'ARDESVO2', nullable: true, length: 15 })
  ardesvo2: string | null;

  @Column('decimal', {
    name: 'ARPZCONF',
    nullable: true,
    precision: 9,
    scale: 3,
    default: () => '(0)',
  })
  arpzconf: number | null;

  @Column('decimal', {
    name: 'ARPZCON2',
    nullable: true,
    precision: 9,
    scale: 3,
    default: () => '(0)',
  })
  arpzcon2: number | null;

  @Column('int', { name: 'ARCOCOL1', nullable: true, default: () => '(0)' })
  arcocol1: number | null;

  @Column('int', { name: 'ARCOCOL2', nullable: true, default: () => '(0)' })
  arcocol2: number | null;

  @FixedColumn('nchar', { name: 'ARNOMENC', nullable: true, length: 8 })
  arnomenc: string | null;

  @FixedColumn('nchar', { name: 'ARUMSUPP', nullable: true, length: 3 })
  arumsupp: string | null;

  @Column('decimal', {
    name: 'ARMOLSUP',
    nullable: true,
    precision: 10,
    scale: 5,
    default: () => '(0)',
  })
  armolsup: number | null;

  @FixedColumn('nchar', { name: 'ARSTASUP', nullable: true, length: 1 })
  arstasup: string | null;

  @Column('decimal', {
    name: 'ARDIMLUN',
    nullable: true,
    precision: 6,
    scale: 1,
    default: () => '(0)',
  })
  ardimlun: number | null;

  @Column('decimal', {
    name: 'ARDIMLU2',
    nullable: true,
    precision: 6,
    scale: 1,
    default: () => '(0)',
  })
  ardimlu2: number | null;

  @Column('decimal', {
    name: 'ARDIMLAR',
    nullable: true,
    precision: 6,
    scale: 1,
    default: () => '(0)',
  })
  ardimlar: number | null;

  @Column('decimal', {
    name: 'ARDIMLA2',
    nullable: true,
    precision: 6,
    scale: 1,
    default: () => '(0)',
  })
  ardimla2: number | null;

  @Column('decimal', {
    name: 'ARDIMALT',
    nullable: true,
    precision: 6,
    scale: 1,
    default: () => '(0)',
  })
  ardimalt: number | null;

  @Column('decimal', {
    name: 'ARDIMAL2',
    nullable: true,
    precision: 6,
    scale: 1,
    default: () => '(0)',
  })
  ardimal2: number | null;

  @Column('date', { name: 'ARDTINVA', nullable: true })
  ardtinva: Date | null;

  @Column('date', { name: 'ARDTOBSO', nullable: true })
  ardtobso: Date | null;

  @FixedColumn('nchar', { name: 'ARFLDISP', nullable: true, length: 1 })
  arfldisp: string | null;

  @FixedColumn('nchar', { name: 'ARFLCONA', nullable: true, length: 1 })
  arflcona: string | null;

  @FixedColumn('nchar', { name: 'ARFLCON2', nullable: true, length: 1 })
  arflcon2: string | null;

  @FixedColumn('nchar', { name: 'ARTIPBAR', nullable: true, length: 1 })
  artipbar: string | null;

  @FixedColumn('nchar', { name: 'ARTIPGES', nullable: true, length: 1 })
  artipges: string | null;

  @Column('int', { name: 'ARSISORD', nullable: true, default: () => '(9)' })
  arsisord: number | null;

  @FixedColumn('nchar', { name: 'ARPROPRE', nullable: true, length: 1 })
  arpropre: string | null;

  @FixedColumn('nchar', {
    name: 'ARFLPINT',
    nullable: true,
    length: 1,
    default: () => "'S'",
  })
  arflpint: string | null;

  @FixedColumn('nchar', {
    name: 'ARFLPEST',
    nullable: true,
    length: 1,
    default: () => "'S'",
  })
  arflpest: string | null;

  @FixedColumn('nchar', {
    name: 'ARFLPCLA',
    nullable: true,
    length: 1,
    default: () => "'S'",
  })
  arflpcla: string | null;

  @Column('int', { name: 'ARSTAINT', nullable: true, default: () => '(0)' })
  arstaint: number | null;

  @Column('int', { name: 'ARSTAEST', nullable: true, default: () => '(0)' })
  arstaest: number | null;

  @Column('int', { name: 'ARSTACLA', nullable: true, default: () => '(0)' })
  arstacla: number | null;

  @FixedColumn('nchar', {
    name: 'ARTIPLAN',
    nullable: true,
    length: 1,
    default: () => "'A'",
  })
  artiplan: string | null;

  @FixedColumn('nchar', {
    name: 'ARFLPRVN',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arflprvn: string | null;

  @FixedColumn('nchar', {
    name: 'ARCRIMAG',
    nullable: true,
    length: 1,
    default: () => "'E'",
  })
  arcrimag: string | null;

  @FixedColumn('nchar', { name: 'ARCODMAGF', nullable: true, length: 5 })
  arcodmagf: string | null;

  @FixedColumn('nchar', { name: 'ARCODDIS', nullable: true, length: 20 })
  arcoddis: string | null;

  @FixedColumn('nchar', { name: 'ARFLCOMP', nullable: true, length: 1 })
  arflcomp: string | null;

  @FixedColumn('nchar', { name: 'ARFLGIS4', nullable: true, length: 1 })
  arflgis4: string | null;

  @FixedColumn('nchar', { name: 'ARFLSERG', nullable: true, length: 1 })
  arflserg: string | null;

  @FixedColumn('nchar', { name: 'ARSTACOD', nullable: true, length: 1 })
  arstacod: string | null;

  @FixedColumn('nchar', { name: 'ARFLUSEP', nullable: true, length: 1 })
  arflusep: string | null;

  @FixedColumn('nchar', {
    name: 'ARTIPSER',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  artipser: string | null;

  @FixedColumn('nchar', { name: 'ARTIPPRE', nullable: true, length: 1 })
  artippre: string | null;

  @FixedColumn('nchar', { name: 'ARFLLOTT', nullable: true, length: 1 })
  arfllott: string | null;

  @FixedColumn('nchar', { name: 'ARCODREP', nullable: true, length: 3 })
  arcodrep: string | null;

  @FixedColumn('nchar', { name: 'ARARTPOS', nullable: true, length: 1 })
  arartpos: string | null;

  @FixedColumn('nchar', { name: 'ARFLPECO', nullable: true, length: 1 })
  arflpeco: string | null;

  @FixedColumn('nchar', { name: 'ARFLVARI', nullable: true, length: 1 })
  arflvari: string | null;

  @FixedColumn('nchar', { name: 'ARCODGRU', nullable: true, length: 5 })
  arcodgru: string | null;

  @FixedColumn('nchar', { name: 'ARCODSOT', nullable: true, length: 5 })
  arcodsot: string | null;

  @FixedColumn('nchar', { name: 'ARFLDISC', nullable: true, length: 1 })
  arfldisc: string | null;

  @FixedColumn('nchar', { name: 'ARFLCESP', nullable: true, length: 1 })
  arflcesp: string | null;

  @FixedColumn('nchar', { name: 'ARCATCES', nullable: true, length: 15 })
  arcatces: string | null;

  @FixedColumn('nchar', {
    name: 'ARGESMAT',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  argesmat: string | null;

  @FixedColumn('nchar', {
    name: 'ARFLLMAG',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arfllmag: string | null;

  @FixedColumn('nchar', {
    name: 'ARFLESUL',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arflesul: string | null;

  @Column('int', { name: 'ARCONLOT', nullable: true, default: () => '(1)' })
  arconlot: number | null;

  @FixedColumn('nchar', {
    name: 'ARDISLOT',
    nullable: true,
    length: 1,
    default: () => "'S'",
  })
  ardislot: string | null;

  @FixedColumn('nchar', {
    name: 'ARKITIMB',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arkitimb: string | null;

  @FixedColumn('nchar', {
    name: 'ARFLESIM',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  arflesim: string | null;

  @FixedColumn('nchar', {
    name: 'ARFLAPCA',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arflapca: string | null;

  @FixedColumn('nchar', {
    name: 'ARRIPCON',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  arripcon: string | null;

  @FixedColumn('nchar', {
    name: 'ARPREZUM',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arprezum: string | null;

  @FixedColumn('nchar', {
    name: 'ARTIPRES',
    nullable: true,
    length: 5,
    default: () => "'PREST'",
  })
  artipres: string | null;

  @FixedColumn('nchar', {
    name: 'ARUTISER',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arutiser: string | null;

  @FixedColumn('nchar', { name: 'ARPERSER', length: 1, default: () => "'I'" })
  arperser: string;

  @FixedColumn('nchar', {
    name: 'ARDATINT',
    nullable: true,
    length: 1,
    default: () => "'F'",
  })
  ardatint: string | null;

  @FixedColumn('nchar', {
    name: 'ARFLCOMM',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arflcomm: string | null;

  @FixedColumn('nchar', { name: 'ARCHKUCA', length: 1, default: () => "'N'" })
  archkuca: string;

  @Column('decimal', {
    name: 'ARMINVEN',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  arminven: number | null;

  @FixedColumn('nchar', { name: 'GESTGUID', nullable: true, length: 14 })
  gestguid: string | null;

  @FixedColumn('nchar', {
    name: 'ARFLCOM1',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arflcom1: string | null;

  @FixedColumn('nchar', {
    name: 'ARSALCOM',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arsalcom: string | null;

  @FixedColumn('nchar', {
    name: 'ARTIPIMP',
    nullable: true,
    length: 1,
    default: () => "'C'",
  })
  artipimp: string | null;

  @FixedColumn('nchar', {
    name: 'ARASSIVA',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  arassiva: string | null;

  @FixedColumn('nchar', { name: 'ARFSRIFE', nullable: true, length: 20 })
  arfsrife: string | null;

  @FixedColumn('nchar', { name: 'ARCCRIFE', nullable: true, length: 20 })
  arccrife: string | null;

  @FixedColumn('nchar', {
    name: 'ARCONCAR',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arconcar: string | null;

  @FixedColumn('nchar', {
    name: 'ARCMPCAR',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arcmpcar: string | null;

  @FixedColumn('nchar', {
    name: 'ARGESCAR',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  argescar: string | null;

  @FixedColumn('nchar', { name: 'ARCCCHAR', nullable: true, length: 1 })
  arccchar: string | null;

  @Column('int', { name: 'ARCCLUNG', nullable: true, default: () => '(0)' })
  arcclung: number | null;

  @FixedColumn('nchar', { name: 'ARCCPROG', nullable: true, length: 18 })
  arccprog: string | null;

  @FixedColumn('nchar', {
    name: 'ARPUBWEB',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arpubweb: string | null;

  @Column('nvarchar', { name: 'ARDESCAT', nullable: true })
  ardescat: string | null;

  @Column('nvarchar', { name: 'ARKEYWORD', nullable: true, length: 200 })
  arkeyword: string | null;

  @Column('nvarchar', { name: 'ARMETADESCRI', nullable: true })
  armetadescri: string | null;

  @Column('nvarchar', { name: 'ARMETATITLE', nullable: true, length: 200 })
  armetatitle: string | null;

  @Column('datetime', {
    name: 'cpupdtms',
    nullable: true,
    default: () => 'getdate()',
  })
  cpupdtms: Date | null;

  @FixedColumn('nchar', {
    name: 'ARFLNOAN',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  arflnoan: string | null;

  @Column('int', { name: 'ARFLGIMR', nullable: true, default: () => '(0)' })
  arflgimr: number | null;

  @Column('int', { name: 'ARFLGART', nullable: true, default: () => '(0)' })
  arflgart: number | null;

  @FixedColumn('nchar', { name: 'ARKEYART', nullable: true, length: 10 })
  arkeyart: string | null;

  @FixedColumn('nchar', { name: 'ARCODUFI', nullable: true, length: 20 })
  arcodufi: string | null;

  @FixedColumn('nchar', {
    name: 'cpccchk',
    nullable: true,
    length: 10,
    default: () => "'qwertyuiop'",
  })
  cpccchk: string | null;

  @Column('nvarchar', { name: 'ARCODFAM', nullable: true })
  arcodfam: string | null;

  @ManyToOne(() => FamArti, (demofamArti) => demofamArti.demoartIcols)
  @JoinColumn([{ name: 'ARCODFAM', referencedColumnName: 'ID' }])
  famAtrticolo: FamArti;

  @OneToMany(() => Matricol, (demomatricol) => demomatricol.articolo)
  matricole: Matricol[];

  /*
  @OneToMany(() => BaArtdocDemo, (baArtdocDemo) => baArtdocDemo.adkeyart2)
  baArtdocS: BaArtdocDemo[];

  @OneToMany(
    () => BaCatalogDefDemo,
    (baCatalogDefDemo) => baCatalogDefDemo.ctkeyartin
  )
  baCatalogDefS: BaCatalogDefDemo[];

  @OneToMany(
    () => BaCatalogDefDemo,
    (baCatalogDefDemo) => baCatalogDefDemo.ctkeyartfi
  )
  baCatalogDefS2: BaCatalogDefDemo[];

  @OneToMany(
    () => BaMatricoleDemo,
    (baMatricoleDemo) => baMatricoleDemo.makeyart2
  )
  baMatricoleS: BaMatricoleDemo[];

  @OneToMany(() => CmLeadsArtDemo, (cmLeadsArtDemo) => cmLeadsArtDemo.prartico)
  cmLeadsArtS: CmLeadsArtDemo[];

  @OneToMany(() => ArtAlte, (demoartAlte) => demoartAlte.arcodice2)
  demoartAltes: ArtAlte[];

  @ManyToOne(() => Cencost, (democencost) => democencost.demoartIcols)
  @JoinColumn([{ name: "ARCODCEN", referencedColumnName: "ccConto" }])
  arcodcen: Cencost;

  @ManyToOne(() => VocCost, (demovocCost) => demovocCost.demoartIcols)
  @JoinColumn([{ name: "ARVOCCEN", referencedColumnName: "vccodice" }])
  arvoccen: VocCost;

  @ManyToOne(() => VocCost, (demovocCost) => demovocCost.demoartIcols2)
  @JoinColumn([{ name: "ARVOCRIC", referencedColumnName: "vccodice" }])
  arvocric: VocCost;

  @ManyToOne(() => Tipcodiv, (demotipcodiv) => demotipcodiv.demoartIcols)
  @JoinColumn([
    { name: "ARCATOPE", referencedColumnName: "tiTipo" },
    { name: "ARTIPOPE", referencedColumnName: "ticodice" },
  ])
  demotipcodiv: Tipcodiv;

  @ManyToOne(() => Grupro, (demogrupro) => demogrupro.demoartIcols)
  @JoinColumn([{ name: "ARGRUPRO", referencedColumnName: "gpcodice" }])
  argrupro: Grupro;

  @ManyToOne(() => Cacoarti, (democacoarti) => democacoarti.demoartIcols)
  @JoinColumn([{ name: "ARCATCON", referencedColumnName: "c1Codice" }])
  arcatcon: Cacoarti;

  @ManyToOne(() => Magazzin, (demomagazzin) => demomagazzin.demoartIcols)
  @JoinColumn([{ name: "ARMAGPRE", referencedColumnName: "mgcodmag" }])
  armagpre: Magazzin;

  @ManyToOne(() => Magazzin, (demomagazzin) => demomagazzin.demoartIcols2)
  @JoinColumn([{ name: "ARMAGIMP", referencedColumnName: "mgcodmag" }])
  armagimp: Magazzin;

  @ManyToOne(() => Grumerc, (demogrumerc) => demogrumerc.demoartIcols)
  @JoinColumn([{ name: "ARGRUMER", referencedColumnName: "ID" }])
  argrumer: Grumerc;

  @ManyToOne(() => CatScma, (democatScma) => democatScma.demoartIcols)
  @JoinColumn([{ name: "ARCATSCM", referencedColumnName: "cscodice" }])
  arcatscm: CatScma;

  @ManyToOne(() => TipColl, (demotipColl) => demotipColl.demoartIcols)
  @JoinColumn([{ name: "ARTIPCO2", referencedColumnName: "tccodice" }])
  artipco: TipColl;

  @ManyToOne(() => TipColl, (demotipColl) => demotipColl.demoartIcols2)
  @JoinColumn([{ name: "ARTIPCO1", referencedColumnName: "tccodice" }])
  artipco2: TipColl;

  @ManyToOne(() => Marchi, (demomarchi) => demomarchi.demoartIcols)
  @JoinColumn([{ name: "ARCODMAR", referencedColumnName: "macodice" }])
  arcodmar: Marchi;

  @ManyToOne(() => Vociiva, (demovociiva) => demovociiva.demoartIcols)
  @JoinColumn([{ name: "ARCODIVA", referencedColumnName: "ivcodiva" }])
  arcodiva: Vociiva;

  @ManyToOne(() => Categomo, (democategomo) => democategomo.demoartIcols)
  @JoinColumn([{ name: "ARCATOMO", referencedColumnName: "omcodice" }])
  arcatomo: Categomo;

  @ManyToOne(() => ClaRica, (democlaRica) => democlaRica.demoartIcols)
  @JoinColumn([{ name: "ARCODRIC", referencedColumnName: "crcodice" }])
  arcodric: ClaRica;

  @ManyToOne(() => Tipcontr, (demotipcontr) => demotipcontr.demoartIcols)
  @JoinColumn([{ name: "ARCONTRI", referencedColumnName: "tpcodice" }])
  arcontri: Tipcontr;

  @ManyToOne(() => BaCategories, (baCategories) => baCategories.demoartIcols)
  @JoinColumn([
    { name: "ARCATPOV", referencedColumnName: "caid" },
    { name: "ARCAMACRO", referencedColumnName: "camacro" },
  ])
  baCategories: BaCategories;

  @ManyToOne(() => ClaRigd, (democlaRigd) => democlaRigd.demoartIcols)
  @JoinColumn([{ name: "ARCODCLA", referencedColumnName: "trcodcla" }])
  arcodcla: ClaRigd;

  @ManyToOne(() => CmtMast, (democmtMast) => democmtMast.demoartIcols)
  @JoinColumn([{ name: "ARCLALOT", referencedColumnName: "cmcodice" }])
  arclalot: CmtMast;

  @ManyToOne(() => CmtMast, (democmtMast) => democmtMast.demoartIcols2)
  @JoinColumn([{ name: "ARCLAMAT", referencedColumnName: "cmcodice" }])
  arclamat: CmtMast;

  @ManyToOne(() => Dismbase, (demodismbase) => demodismbase.demoartIcols)
  @JoinColumn([{ name: "ARCODDIS", referencedColumnName: "dbcodice" }])
  arcoddis2: Dismbase;

  @ManyToOne(() => Dismbase, (demodismbase) => demodismbase.demoartIcols2)
  @JoinColumn([{ name: "ARCODIMB", referencedColumnName: "dbcodice" }])
  arcodimb: Dismbase;

  

  @ManyToOne(() => ConColl, (democonColl) => democonColl.demoartIcols)
  @JoinColumn([
    { name: "ARTIPCO1", referencedColumnName: "tccodice" },
    { name: "ARTPCONF", referencedColumnName: "tccodcon" },
  ])
  democonColl: ConColl;

  @ManyToOne(() => ConColl, (democonColl) => democonColl.demoartIcols2)
  @JoinColumn([
    { name: "ARTIPCO2", referencedColumnName: "tccodice" },
    { name: "ARTPCON2", referencedColumnName: "tccodcon" },
  ])
  democonColl2: ConColl;

  @ManyToOne(() => Unimis, (demounimis) => demounimis.demoartIcols)
  @JoinColumn([{ name: "ARUMVOLU", referencedColumnName: "umcodice" }])
  arumvolu: Unimis;

  @ManyToOne(() => Unimis, (demounimis) => demounimis.demoartIcols2)
  @JoinColumn([{ name: "ARUMVOL2", referencedColumnName: "umcodice" }])
  arumvol: Unimis;

  @ManyToOne(() => Unimis, (demounimis) => demounimis.demoartIcols3)
  @JoinColumn([{ name: "ARUMDIME", referencedColumnName: "umcodice" }])
  arumdime: Unimis;

  @ManyToOne(() => Unimis, (demounimis) => demounimis.demoartIcols4)
  @JoinColumn([{ name: "ARUMDIM2", referencedColumnName: "umcodice" }])
  arumdim: Unimis;

  @ManyToOne(() => Unimis, (demounimis) => demounimis.demoartIcols5)
  @JoinColumn([{ name: "ARUNMIS1", referencedColumnName: "umcodice" }])
  arunmis: Unimis;

  @ManyToOne(() => Unimis, (demounimis) => demounimis.demoartIcols6)
  @JoinColumn([{ name: "ARUNMIS2", referencedColumnName: "umcodice" }])
  arunmis2: Unimis;

  @ManyToOne(() => MatCri, (demomatCri) => demomatCri.demoartIcols)
  @JoinColumn([{ name: "ARCLACRI", referencedColumnName: "mtcodice" }])
  arclacri: MatCri;

  /*
  @OneToMany(() => Catmcont, (democatmcont) => democatmcont.cgserviz)
  democatmconts: Catmcont[];

  @OneToMany(() => ComVari, (democomVari) => democomVari.cvcodart2)
  democomVaris: ComVari[];

  @OneToMany(() => ConTrad, (democonTrad) => democonTrad.cocodart2)
  democonTrads: ConTrad[];

  @OneToMany(() => Contrart, (democontrart) => democontrart.mccodart2)
  democontrarts: Contrart[];

  @OneToMany(() => DisRiso, (demodisRiso) => demodisRiso.drserviz)
  demodisRisos: DisRiso[];

  @OneToOne(() => EcArtic, (demoecArtic) => demoecArtic.arcodart2)
  demoecArtic: EcArtic;

  @OneToOne(() => Itartext, (demoitartext) => demoitartext.itcodart2)
  demoitartext: Itartext;

  @OneToMany(() => KeyArti, (demokeyArti) => demokeyArti.cacodart2)
  demokeyArtis: KeyArti[];

  @OneToMany(() => LisTini, (demolisTini) => demolisTini.licodart2)
  demolisTinis: LisTini[];

  @OneToMany(() => Lottiart, (demolottiart) => demolottiart.locodart2)
  demolottiarts: Lottiart[];



  @OneToMany(() => ModArti, (demomodArti) => demomodArti.igartrif)
  demomodArtis: ModArti[];

  @OneToMany(() => Mvloubma, (demomvloubma) => demomvloubma.mtkeysal2)
  demomvloubmas: Mvloubma[];

  @OneToMany(() => MvmDett, (demomvmDett) => demomvmDett.mmcodart2)
  demomvmDetts: MvmDett[];

  @OneToOne(() => NotArti, (demonotArti) => demonotArti.arcodart2)
  demonotArti: NotArti;

  @OneToMany(() => ParRima, (demoparRima) => demoparRima.prcodart2)
  demoparRimas: ParRima[];

  @OneToOne(() => ParRior, (demoparRior) => demoparRior.prcodart2)
  demoparRior: ParRior;

  @OneToMany(() => RicPrez, (demoricPrez) => demoricPrez.licodart2)
  demoricPrezs: RicPrez[];

  @OneToMany(() => Rilevazi, (demorilevazi) => demorilevazi.drcodart)
  demorilevazis: Rilevazi[];

  @OneToMany(() => Saldiart, (demosaldiart) => demosaldiart.slcodice2)
  demosaldiarts: Saldiart[];

  @OneToMany(() => Saldicom, (demosaldicom) => demosaldicom.sccodice2)
  demosaldicoms: Saldicom[];

  @OneToMany(() => Salotcom, (demosalotcom) => demosalotcom.smcodart2)
  demosalotcoms: Salotcom[];

  @OneToMany(() => UnitLog, (demounitLog) => demounitLog.ulcodart)
  demounitLogs: UnitLog[];

  @OneToMany(() => IpDocumeDemo, (ipDocumeDemo) => ipDocumeDemo.dokeyart)
  ipDocumeS: IpDocumeDemo[];*/
}
