import { Column, Entity, PrimaryColumn } from 'typeorm';
import { FixedColumn, FixedPrimaryColumn } from '../FixedColumn';
import VersionedEntity from '../VersionedEntity';
@Entity('MAGAZZIN')
export class Magazzin extends VersionedEntity {
  @FixedPrimaryColumn('nchar', { primary: true, name: 'mgcodmag', length: 5 })
  ID: string;

  get humanReadableID() {
    return this.ID;
  }

  @Column('nvarchar', { name: 'MGDESMAG', nullable: true, length: 30 })
  mgdesmag: string | null;

  @Column('nvarchar', { name: 'MGINDMAG', nullable: true, length: 30 })
  mgindmag: string | null;

  @FixedColumn('nchar', { name: 'MGMAGCAP', nullable: true, length: 10 })
  mgmagcap: string | null;

  @Column('nvarchar', { name: 'MGCITMAG', nullable: true, length: 50 })
  mgcitmag: string | null;

  @FixedColumn('nchar', { name: 'MGPROMAG', nullable: true, length: 5 })
  mgpromag: string | null;

  @FixedColumn('nchar', { name: 'MGFISMAG', nullable: true, length: 1 })
  mgfismag: string | null;

  @Column('nvarchar', { name: 'MGPERSON', nullable: true, length: 40 })
  mgperson: string | null;

  @Column('nvarchar', { name: 'MG__NOTE', nullable: true, length: 40 })
  mgNote: string | null;

  @FixedColumn('nchar', { name: 'MGTELEFO', nullable: true, length: 18 })
  mgtelefo: string | null;

  @Column('nvarchar', { name: 'MG_EMAIL', nullable: true, length: 254 })
  mgEmail: string | null;

  @Column('nvarchar', { name: 'MG_EMPEC', nullable: true, length: 254 })
  mgEmpec: string | null;

  @Column('date', { name: 'MGDTINVA', nullable: true })
  mgdtinva: Date | null;

  @Column('date', { name: 'MGDTOBSO', nullable: true })
  mgdtobso: Date | null;

  @FixedColumn('nchar', { name: 'MGMAGRAG', nullable: true, length: 5 })
  mgmagrag: string | null;

  @FixedColumn('nchar', { name: 'MGDISMAG', nullable: true, length: 1 })
  mgdismag: string | null;

  @FixedColumn('nchar', { name: 'MGTIPMAG', nullable: true, length: 1 })
  mgtipmag: string | null;

  @FixedColumn('nchar', { name: 'MGMAGWEB', nullable: true, length: 1 })
  mgmagweb: string | null;

  @FixedColumn('nchar', { name: 'MGFLUBIC', nullable: true, length: 1 })
  mgflubic: string | null;

  @FixedColumn('nchar', { name: 'MGSTAINT', nullable: true, length: 1 })
  mgstaint: string | null;

  @Column('int', { name: 'MGPRPAGM', nullable: true, default: () => '(0)' })
  mgprpagm: number | null;

  @FixedColumn('nchar', { name: 'MGPREFIS', nullable: true, length: 20 })
  mgprefis: string | null;

  @FixedColumn('nchar', {
    name: 'MGGESCAR',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  mggescar: string | null;

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
    (baCatalogDefDemo) => baCatalogDefDemo.ctcodmagin
  )
  baCatalogDefS: BaCatalogDefDemo[];

  @OneToMany(
    () => BaCatalogDefDemo,
    (baCatalogDefDemo) => baCatalogDefDemo.ctcodmagfi
  )
  baCatalogDefS2: BaCatalogDefDemo[];

  @OneToMany(
    () => BaCatalogDefDemo,
    (baCatalogDefDemo) => baCatalogDefDemo.ctcodmagin2
  )
  baCatalogDefS3: BaCatalogDefDemo[];

  @OneToMany(
    () => BaCatalogDefDemo,
    (baCatalogDefDemo) => baCatalogDefDemo.ctcodmagfi2
  )
  baCatalogDefS4: BaCatalogDefDemo[];

  @OneToMany(() => ArtIcol, (demoartIcol) => demoartIcol.armagpre)
  demoartIcols: ArtIcol[];

  @OneToMany(() => ArtIcol, (demoartIcol) => demoartIcol.armagimp)
  demoartIcols2: ArtIcol[];

  @OneToMany(() => Conti, (democonti) => democonti.anmagter)
  democontis: Conti[];

  @OneToMany(() => DocDett, (demodocDett) => demodocDett.mvcodmat)
  demodocDetts: DocDett[];

  @OneToMany(() => DocDett, (demodocDett) => demodocDett.mvcodmag)
  demodocDetts2: DocDett[];

  @OneToOne(() => Ecmagazz, (demoecmagazz) => demoecmagazz.mgcodmag2)
  demoecmagazz: Ecmagazz;

  @OneToMany(() => Grudmag, (demogrudmag) => demogrudmag.grcodmag2)
  demogrudmags: Grudmag[];

  @OneToMany(() => Grummag, (demogrummag) => demogrummag.grmagwip)
  demogrummags: Grummag[];

  @OneToMany(() => Grummag, (demogrummag) => demogrummag.grmagprf)
  demogrummags2: Grummag[];

  @OneToMany(() => Grummag, (demogrummag) => demogrummag.grmagsem)
  demogrummags3: Grummag[];

  @OneToMany(() => Grummag, (demogrummag) => demogrummag.grmagmrp)
  demogrummags4: Grummag[];

  @OneToMany(() => Grummag, (demogrummag) => demogrummag.grmagsca)
  demogrummags5: Grummag[];

  @ManyToOne(() => Conti, (democonti) => democonti.demomagazzins)
  @JoinColumn([
    { name: "MGTIPCON", referencedColumnName: "antipcon" },
    { name: "MGRIFFOR", referencedColumnName: "ancodice" },
  ])
  democonti: Conti;

  @OneToMany(() => Matricol, (demomatricol) => demomatricol.amcodmag)
  demomatricols: Matricol[];

  @OneToMany(() => Mvloubma, (demomvloubma) => demomvloubma.mtmagcar2)
  demomvloubmas: Mvloubma[];

  @OneToMany(() => Mvloubma, (demomvloubma) => demomvloubma.mtmagsca2)
  demomvloubmas2: Mvloubma[];

  @OneToMany(() => MvmDett, (demomvmDett) => demomvmDett.mmcodmag)
  demomvmDetts: MvmDett[];

  @OneToMany(() => MvmDett, (demomvmDett) => demomvmDett.mmcodmat)
  demomvmDetts2: MvmDett[];

  @OneToMany(() => ParRima, (demoparRima) => demoparRima.prcodmag2)
  demoparRimas: ParRima[];

  @OneToMany(
    () => RdlgTipomis,
    (demordlgTipomis) => demordlgTipomis.tpmagver
  )
  demordlgTipomis: RdlgTipomis[];

  @OneToMany(
    () => RdlgTipomis,
    (demordlgTipomis) => demordlgTipomis.tpmagpre
  )
  demordlgTipomis2: RdlgTipomis[];

  @OneToMany(() => Rilevazi, (demorilevazi) => demorilevazi.drcodmag2)
  demorilevazis: Rilevazi[];

  @OneToMany(() => Saldiart, (demosaldiart) => demosaldiart.slcodmag2)
  demosaldiarts: Saldiart[];

  @OneToMany(() => Saldicom, (demosaldicom) => demosaldicom.sccodmag2)
  demosaldicoms: Saldicom[];

  @OneToMany(() => Salotcom, (demosalotcom) => demosalotcom.smcodmag2)
  demosalotcoms: Salotcom[];

  @OneToMany(() => TipDocu, (demotipDocu) => demotipDocu.tdcodmag)
  demotipDocus: TipDocu[];

  @OneToMany(() => TipDocu, (demotipDocu) => demotipDocu.tdcodmat)
  demotipDocus2: TipDocu[];

  @OneToMany(() => Ubicazio, (demoubicazio) => demoubicazio.ubcodmag2)
  demoubicazios: Ubicazio[];

  @OneToMany(() => IpStoreDemo, (ipStoreDemo) => ipStoreDemo.stcodmag)
  ipStoreS: IpStoreDemo[];*/
}
