import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FixedColumn } from '../FixedColumn';
import VersionedEntity from '../VersionedEntity';
import { ArtIcol } from './ArtIcol.entity';

@Entity('KEY_ARTI')
export class KeyArti extends VersionedEntity {
  @PrimaryColumn('nvarchar', { name: 'CACODIC2', length: 50 })
  ID: string;

  get humanReadableID() {
    return this.ID;
  }

  @FixedColumn('nchar', { name: 'CACODICE', length: 20 })
  cacodice: string;

  @Column('nvarchar', { name: 'CADESART', nullable: true, length: 40 })
  cadesart: string | null;

  @Column('nvarchar', { name: 'CADESSUP', nullable: true })
  cadessup: string | null;

  @FixedColumn('nchar', { name: 'CACODART', nullable: true, length: 20 })
  cacodart: string | null;
  @JoinColumn({ name: 'CACODART', referencedColumnName: 'arcodart' })
  @ManyToOne(() => ArtIcol)
  articolo: ArtIcol;

  @FixedColumn('nchar', { name: 'CATIPCON', nullable: true, length: 1 })
  catipcon: string | null;

  @FixedColumn('nchar', { name: 'CACODCON', nullable: true, length: 15 })
  cacodcon: string | null;

  @FixedColumn('nchar', { name: 'CA__TIPO', nullable: true, length: 1 })
  caTipo: string | null;

  @FixedColumn('nchar', { name: 'CATIPBAR', nullable: true, length: 1 })
  catipbar: string | null;

  @FixedColumn('nchar', { name: 'CAFLSTAM', nullable: true, length: 1 })
  caflstam: string | null;

  @FixedColumn('nchar', { name: 'CAOPERAT', nullable: true, length: 1 })
  caoperat: string | null;

  @Column('decimal', {
    name: 'CAMOLTIP',
    nullable: true,
    precision: 10,
    scale: 4,
    default: () => '(0)',
  })
  camoltip: number | null;

  @Column('date', { name: 'CADTINVA', nullable: true })
  cadtinva: Date | null;

  @Column('date', { name: 'CADTOBSO', nullable: true })
  cadtobso: Date | null;

  @Column('decimal', {
    name: 'CAPESNE3',
    nullable: true,
    precision: 9,
    scale: 3,
    default: () => '(0)',
  })
  capesne3: number | null;

  @Column('decimal', {
    name: 'CAPESLO3',
    nullable: true,
    precision: 9,
    scale: 3,
    default: () => '(0)',
  })
  capeslo3: number | null;

  @FixedColumn('nchar', { name: 'CADESVO3', nullable: true, length: 15 })
  cadesvo3: string | null;

  @Column('decimal', {
    name: 'CAPZCON3',
    nullable: true,
    precision: 9,
    scale: 3,
    default: () => '(0)',
  })
  capzcon3: number | null;

  @Column('int', { name: 'CACOCOL3', nullable: true, default: () => '(0)' })
  cacocol3: number | null;

  @Column('decimal', {
    name: 'CADIMLU3',
    nullable: true,
    precision: 6,
    scale: 1,
    default: () => '(0)',
  })
  cadimlu3: number | null;

  @Column('decimal', {
    name: 'CADIMLA3',
    nullable: true,
    precision: 6,
    scale: 1,
    default: () => '(0)',
  })
  cadimla3: number | null;

  @Column('decimal', {
    name: 'CADIMAL3',
    nullable: true,
    precision: 6,
    scale: 1,
    default: () => '(0)',
  })
  cadimal3: number | null;

  @Column('int', { name: 'CALENSCF', nullable: true, default: () => '(0)' })
  calenscf: number | null;

  @FixedColumn('nchar', {
    name: 'CAFLIMBA',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  caflimba: string | null;

  @FixedColumn('nchar', {
    name: 'CAPUBWEB',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  capubweb: string | null;

  @Column('decimal', {
    name: 'CAMINVEN',
    nullable: true,
    precision: 20,
    scale: 8,
    default: () => '(0)',
  })
  caminven: number | null;

  @Column('nvarchar', { name: 'CACODFAS', nullable: true, length: 66 })
  cacodfas: string | null;

  @FixedColumn('nchar', {
    name: 'CANUMDEQ',
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  canumdeq: string | null;

  @FixedColumn('nchar', { name: 'CAFLCON3', nullable: true, length: 1 })
  caflcon3: string | null;

  @Column('datetime', {
    name: 'cpupdtms',
    nullable: true,
    default: () => 'getdate()',
  })
  cpupdtms: Date | null;

  @FixedColumn('nchar', {
    name: 'CAFLPRIN',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  caflprin: string | null;

  @Column('int', { name: 'CAFLGART', nullable: true, default: () => '(0)' })
  caflgart: number | null;

  @FixedColumn('nchar', { name: 'CAIDGUID', nullable: true, length: 10 })
  caidguid: string | null;

  @FixedColumn('nchar', { name: 'CACODUFI', nullable: true, length: 20 })
  cacodufi: string | null;

  @Column('int', { name: 'CATIPEAN', nullable: true, default: () => '(0)' })
  catipean: number | null;

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
    (baCatalogDefDemo) => baCatalogDefDemo.ctkeyricin
  )
  baCatalogDefS: BaCatalogDefDemo[];

  @OneToMany(
    () => BaCatalogDefDemo,
    (baCatalogDefDemo) => baCatalogDefDemo.ctkeyricfi
  )
  baCatalogDefS2: BaCatalogDefDemo[];

  @OneToMany(() => CmCampprodDemo, (cmCampprodDemo) => cmCampprodDemo.prcodart)
  cmCampprodS: CmCampprodDemo[];

  @OneToMany(() => CmCompArtDemo, (cmCompArtDemo) => cmCompArtDemo.pccodart)
  cmCompArtS: CmCompArtDemo[];

  @OneToMany(
    () => CmElefilartDemo,
    (cmElefilartDemo) => cmElefilartDemo.facodkey2
  )
  cmElefilartS: CmElefilartDemo[];

  @OneToMany(() => CmLeadsArtDemo, (cmLeadsArtDemo) => cmLeadsArtDemo.prcodart)
  cmLeadsArtS: CmLeadsArtDemo[];

  @OneToMany(() => CmSettingsDemo, (cmSettingsDemo) => cmSettingsDemo.cscodart)
  cmSettingsS: CmSettingsDemo[];

  @OneToMany(() => CmSettingsDemo, (cmSettingsDemo) => cmSettingsDemo.cskeydes)
  cmSettingsS2: CmSettingsDemo[];

  @OneToMany(() => ArtAlte, (demoartAlte) => demoartAlte.arcodalt)
  demoartAltes: ArtAlte[];

  @OneToMany(() => ComVari, (democomVari) => democomVari.cvcodcom)
  democomVaris: ComVari[];

  @OneToMany(() => Distbase, (demodistbase) => demodistbase.dbcodcom2)
  demodistbases: Distbase[];

  @OneToOne(() => EckeyArti, (demoeckeyArti) => demoeckeyArti.cacodice2)
  demoeckeyArti: EckeyArti;

  @ManyToOne(() => TipColl, (demotipColl) => demotipColl.demokeyArtis)
  @JoinColumn([{ name: "CATIPCO3", referencedColumnName: "tccodice" }])
  catipco: TipColl;

  @ManyToOne(() => Conti, (democonti) => democonti.demokeyArtis)
  @JoinColumn([
    { name: "CATIPCON", referencedColumnName: "antipcon" },
    { name: "CACODCON", referencedColumnName: "ancodice" },
  ])
  democonti: Conti;

  @ManyToOne(() => Unimis, (demounimis) => demounimis.demokeyArtis)
  @JoinColumn([{ name: "CAUMDIM3", referencedColumnName: "umcodice" }])
  caumdim: Unimis;

  @ManyToOne(() => Unimis, (demounimis) => demounimis.demokeyArtis2)
  @JoinColumn([{ name: "CAUMVOL3", referencedColumnName: "umcodice" }])
  caumvol: Unimis;

  @ManyToOne(() => Unimis, (demounimis) => demounimis.demokeyArtis3)
  @JoinColumn([{ name: "CAUNIMIS", referencedColumnName: "umcodice" }])
  caunimis: Unimis;

  @ManyToOne(() => ConColl, (democonColl) => democonColl.demokeyArtis)
  @JoinColumn([
    { name: "CATIPCO3", referencedColumnName: "tccodice" },
    { name: "CATPCON3", referencedColumnName: "tccodcon" },
  ])
  democonColl: ConColl;

  @ManyToOne(() => ArtIcol, (demoartIcol) => demoartIcol.demokeyArtis)
  @JoinColumn([{ name: "CACODART", referencedColumnName: "arcodart" }])
  cacodart2: ArtIcol;

  @OneToMany(() => MvmDett, (demomvmDett) => demomvmDett.mmcodice2)
  demomvmDetts: MvmDett[];

  @OneToOne(
    () => RdlgKeyarti,
    (demordlgKeyarti) => demordlgKeyarti.cacodice2
  )
  demordlgKeyarti: RdlgKeyarti;

  @OneToMany(() => Rilevazi, (demorilevazi) => demorilevazi.drcodric)
  demorilevazis: Rilevazi[];

  @OneToMany(() => Tradarti, (demotradarti) => demotradarti.lgcodice2)
  demotradartis: Tradarti[];

  @OneToMany(() => UnitLog, (demounitLog) => demounitLog.ulcodice)
  demounitLogs: UnitLog[];

  @OneToOne(
    () => EtTipcasartDemo,
    (etTipcasartDemo) => etTipcasartDemo.takeyart2
  )
  etTipcasartDemo: EtTipcasartDemo;

  @OneToMany(() => IpPromotDemo, (ipPromotDemo) => ipPromotDemo.apcoddes)
  ipPromotS: IpPromotDemo[];

  @OneToMany(() => IpPromotDemo, (ipPromotDemo) => ipPromotDemo.apkeyart)
  ipPromotS2: IpPromotDemo[];

  @OneToMany(() => IpRefproDemo, (ipRefproDemo) => ipRefproDemo.rpcodkey)
  ipRefproS: IpRefproDemo[];

  @OneToMany(() => IpStoarrDemo, (ipStoarrDemo) => ipStoarrDemo.saidguid2)
  ipStoarrS: IpStoarrDemo[];

  @OneToMany(() => IpStoreDemo, (ipStoreDemo) => ipStoreDemo.stkeygft)
  ipStoreS: IpStoreDemo[];

  @OneToMany(() => IpStoreDemo, (ipStoreDemo) => ipStoreDemo.startdes)
  ipStoreS2: IpStoreDemo[];

  @OneToMany(() => IpStoreDemo, (ipStoreDemo) => ipStoreDemo.startsco)
  ipStoreS3: IpStoreDemo[];

  @OneToMany(() => IpStoreDemo, (ipStoreDemo) => ipStoreDemo.stkeyacc)
  ipStoreS4: IpStoreDemo[];

  @OneToMany(() => IpStoreDemo, (ipStoreDemo) => ipStoreDemo.stkeybuo)
  ipStoreS5: IpStoreDemo[];

  @OneToMany(() => IpTipbuoniDemo, (ipTipbuoniDemo) => ipTipbuoniDemo.tbcodkey)
  ipTipbuoniS: IpTipbuoniDemo[];

  @OneToMany(
    () => PvFilassconDemo,
    (pvFilassconDemo) => pvFilassconDemo.gacodart
  )
  pvFilassconS: PvFilassconDemo[];*/
}
