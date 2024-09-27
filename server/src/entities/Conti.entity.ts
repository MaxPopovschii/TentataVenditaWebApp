import { Column, Entity, OneToMany } from 'typeorm';
import { DesDive } from './DesDive.entity';
import { ContoID } from '../../../common/src/index';
import { FixedColumn, FixedPrimaryColumn } from '../FixedColumn';
import VersionedEntity from '../VersionedEntity';

@Entity('CONTI')
export class Conti extends VersionedEntity {
  @FixedPrimaryColumn('nchar', { primary: true, name: 'ANTIPCON', length: 1 })
  antipcon: string;

  @FixedPrimaryColumn('nchar', {
    primary: true,
    name: 'ANCODICE',
    length: 15,
    transformer: {
      from(value) {
        return value ? value.trim() : null;
      },
      to(value) {
        return value ? value.padEnd(15, ' ') : null;
      },
    },
  })
  ancodice: string;

  @Column('nvarchar', { name: 'ANDESCRI', nullable: true, length: 60 })
  andescri: string | null;

  get ID() {
    return ContoID.compute(this);
  }

  get humanReadableID() {
    return this.ancodice;
  }

  @Column('nvarchar', { name: 'ANDESCR2', nullable: true, length: 60 })
  andescr2: string | null;

  @Column('nvarchar', { name: 'ANINDIRI', nullable: true, length: 40 })
  anindiri: string | null;

  @Column('nvarchar', { name: 'ANINDIR2', nullable: true, length: 40 })
  anindir2: string | null;

  @FixedColumn('nchar', { name: 'AN___CAP', nullable: true, length: 10 })
  anCap: string | null;

  @Column('nvarchar', { name: 'ANLOCALI', nullable: true, length: 50 })
  anlocali: string | null;

  @FixedColumn('nchar', { name: 'ANPROVIN', nullable: true, length: 5 })
  anprovin: string | null;

  @FixedColumn('nchar', { name: 'ANTELEFO', nullable: true, length: 18 })
  antelefo: string | null;

  @FixedColumn('nchar', { name: 'ANTELFAX', nullable: true, length: 18 })
  antelfax: string | null;

  @FixedColumn('nchar', { name: 'ANNUMCEL', nullable: true, length: 18 })
  annumcel: string | null;

  @FixedColumn('nchar', { name: 'ANPERFIS', nullable: true, length: 1 })
  anperfis: string | null;

  @FixedColumn('nchar', { name: 'AN_SESSO', nullable: true, length: 1 })
  anSesso: string | null;

  @Column('date', { name: 'ANDATNAS', nullable: true })
  andatnas: Date | null;

  @Column('nvarchar', { name: 'ANLOCNAS', nullable: true, length: 50 })
  anlocnas: string | null;

  @FixedColumn('nchar', { name: 'ANPRONAS', nullable: true, length: 5 })
  anpronas: string | null;

  @FixedColumn('nchar', { name: 'ANCODFIS', nullable: true, length: 16 })
  ancodfis: string | null;

  @FixedColumn('nchar', { name: 'ANPARIVA', nullable: true, length: 12 })
  anpariva: string | null;

  @FixedColumn('nchar', {
    name: 'ANPARTSN',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anpartsn: string | null;

  @FixedColumn('nchar', { name: 'ANCODBA2', nullable: true, length: 15 })
  ancodba2: string | null;

  @Column('int', { name: 'AN1MESCL', nullable: true, default: () => '(0)' })
  an1Mescl: number | null;

  @Column('int', { name: 'ANGIOSC1', nullable: true, default: () => '(0)' })
  angiosc1: number | null;

  @Column('int', { name: 'AN2MESCL', nullable: true, default: () => '(0)' })
  an2Mescl: number | null;

  @Column('int', { name: 'ANGIOSC2', nullable: true, default: () => '(0)' })
  angiosc2: number | null;

  @Column('int', { name: 'ANGIOFIS', nullable: true, default: () => '(0)' })
  angiofis: number | null;

  @Column('decimal', {
    name: 'AN1SCONT',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  an1Scont: number | null;

  @Column('decimal', {
    name: 'AN2SCONT',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  an2Scont: number | null;

  @Column('nchar', { name: 'ANNUMLIS', length: 5 })
  annumlis: string;

  @FixedColumn('nchar', {
    name: 'ANTIPFAT',
    nullable: true,
    length: 1,
    default: () => "'R'",
  })
  antipfat: string | null;

  @FixedColumn('nchar', { name: 'ANBOLFAT', nullable: true, length: 1 })
  anbolfat: string | null;

  @FixedColumn('nchar', {
    name: 'ANPREBOL',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anprebol: string | null;

  @FixedColumn('nchar', {
    name: 'ANSCORPO',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anscorpo: string | null;

  @Column('nvarchar', { name: 'ANNUMCOR', nullable: true, length: 25 })
  annumcor: string | null;

  @Column('nvarchar', { name: 'AN__NOTE', nullable: true })
  anNote: string | null;

  @Column('nvarchar', { name: 'ANINDWEB', nullable: true, length: 254 })
  anindweb: string | null;

  @Column('nvarchar', { name: 'AN_EMAIL', nullable: true, length: 254 })
  anEmail: string | null;

  @Column('nvarchar', { name: 'AN_EMPEC', nullable: true, length: 254 })
  anEmpec: string | null;

  @FixedColumn('nchar', {
    name: 'ANRITENU',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anritenu: string | null;

  @Column('nvarchar', { name: 'ANCOGNOM', nullable: true, length: 50 })
  ancognom: string | null;

  @Column('nvarchar', { name: 'AN__NOME', nullable: true, length: 50 })
  anNome: string | null;

  @FixedColumn('nchar', { name: 'ANCONSUP', nullable: true, length: 15 })
  anconsup: string | null;

  @FixedColumn('nchar', { name: 'ANTIPSOT', nullable: true, length: 1 })
  antipsot: string | null;

  @Column('nvarchar', { name: 'ANCCNOTE', nullable: true })
  anccnote: string | null;

  @FixedColumn('nchar', { name: 'ANCCTAGG', nullable: true, length: 1 })
  ancctagg: string | null;

  @Column('date', { name: 'ANDTINVA', nullable: true })
  andtinva: Date | null;

  @Column('date', { name: 'ANDTOBSO', nullable: true })
  andtobso: Date | null;

  @Column('int', { name: 'ANNOTAIN', nullable: true, default: () => '(0)' })
  annotain: number | null;

  @FixedColumn('nchar', { name: 'ANTIPCLF', nullable: true, length: 1 })
  antipclf: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLRAGG',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflragg: string | null;

  @Column('date', { name: 'ANDATAVV', nullable: true })
  andatavv: Date | null;

  @FixedColumn('nchar', {
    name: 'ANFLGAVV',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflgavv: string | null;

  @FixedColumn('nchar', { name: 'ANTIPRIF', nullable: true, length: 1 })
  antiprif: string | null;

  @FixedColumn('nchar', { name: 'ANCONRIF', nullable: true, length: 15 })
  anconrif: string | null;

  @FixedColumn('nchar', { name: 'ANFLESIG', nullable: true, length: 1 })
  anflesig: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLCODI',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflcodi: string | null;

  @FixedColumn('nchar', {
    name: 'AFFLINTR',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  afflintr: string | null;

  @FixedColumn('nchar', { name: 'ANCONCON', nullable: true, length: 3 })
  anconcon: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLFIDO',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflfido: string | null;

  @Column('money', { name: 'ANVALFID', nullable: true, default: () => '(0)' })
  anvalfid: number | null;

  @Column('money', { name: 'ANMAXORD', nullable: true, default: () => '(0)' })
  anmaxord: number | null;

  @FixedColumn('nchar', { name: 'ANFLBLVE', nullable: true, length: 1 })
  anflblve: string | null;

  @Column('date', { name: 'ANDATMOR', nullable: true })
  andatmor: Date | null;

  @FixedColumn('nchar', { name: 'ANPAGPAR', nullable: true, length: 5 })
  anpagpar: string | null;

  @FixedColumn('nchar', { name: 'ANCOIMPS', nullable: true, length: 20 })
  ancoimps: string | null;

  @Column('decimal', {
    name: 'ANPEINPS',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  anpeinps: number | null;

  @Column('decimal', {
    name: 'ANRIINPS',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  anriinps: number | null;

  @Column('decimal', {
    name: 'ANCOINPS',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  ancoinps: number | null;

  @Column('int', { name: 'ANCODATT', nullable: true, default: () => '(0)' })
  ancodatt: number | null;

  @FixedColumn('nchar', { name: 'ANCODTR2', nullable: true, length: 5 })
  ancodtr2: string | null;

  @FixedColumn('nchar', { name: 'ANFLGIS4', nullable: true, length: 1 })
  anflgis4: string | null;

  @FixedColumn('nchar', {
    name: 'ANGESCON',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  angescon: string | null;

  @FixedColumn('nchar', { name: 'ANFLGCON', nullable: true, length: 1 })
  anflgcon: string | null;

  @FixedColumn('nchar', {
    name: 'ANCODSTU',
    nullable: true,
    length: 10,
    default: () => "' '",
  })
  ancodstu: string | null;

  @FixedColumn('nchar', { name: 'ANIBARID', nullable: true, length: 16 })
  anibarid: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLAACC',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflaacc: string | null;

  @FixedColumn('nchar', { name: 'ANRISESE', nullable: true, length: 1 })
  anrisese: string | null;

  @FixedColumn('nchar', { name: 'ANCODASS', nullable: true, length: 3 })
  ancodass: string | null;

  @FixedColumn('nchar', { name: 'ANCLIPOS', nullable: true, length: 1 })
  anclipos: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLESIM',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflesim: string | null;

  @Column('decimal', {
    name: 'ANSAGINT',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  ansagint: number | null;

  @FixedColumn('nchar', {
    name: 'ANFLACBD',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflacbd: string | null;

  @FixedColumn('nchar', { name: 'ANCINABI', nullable: true, length: 1 })
  ancinabi: string | null;

  @Column('nvarchar', { name: 'AN__IBAN', nullable: true, length: 35 })
  anIban: string | null;

  @Column('nvarchar', { name: 'AN__BBAN', nullable: true, length: 30 })
  anBban: string | null;

  @FixedColumn('nchar', { name: 'ANCODESC', nullable: true, length: 5 })
  ancodesc: string | null;

  @FixedColumn('nchar', { name: 'ANCODORN', nullable: true, length: 15 })
  ancodorn: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLIMBA',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflimba: string | null;

  @Column('decimal', {
    name: 'ANSPEINC',
    nullable: true,
    precision: 9,
    scale: 2,
    default: () => '(0)',
  })
  anspeinc: number | null;

  @FixedColumn('nchar', { name: 'ANCODIRP', nullable: true, length: 5 })
  ancodirp: string | null;

  @FixedColumn('nchar', { name: 'ANCAURIT', nullable: true, length: 2 })
  ancaurit: string | null;

  @Column('decimal', {
    name: 'ANCASPRO',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  ancaspro: number | null;

  @FixedColumn('nchar', {
    name: 'ANFLGCPZ',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  anflgcpz: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLSGRE',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflsgre: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLINCA',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflinca: string | null;

  @FixedColumn('nchar', {
    name: 'ANCODSOG',
    nullable: true,
    length: 8,
    default: () => "'        '",
  })
  ancodsog: string | null;

  @FixedColumn('nchar', { name: 'ANCODCAT', nullable: true, length: 4 })
  ancodcat: string | null;

  @Column('nvarchar', { name: 'ANCOFISC', nullable: true, length: 25 })
  ancofisc: string | null;

  @FixedColumn('nchar', { name: 'ANFLGEST', nullable: true, length: 1 })
  anflgest: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLPRIV',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflpriv: string | null;

  @FixedColumn('nchar', { name: 'ANNUMCAR', nullable: true, length: 18 })
  annumcar: string | null;

  @FixedColumn('nchar', { name: 'ANCODPOR', nullable: true, length: 10 })
  ancodpor: string | null;

  @FixedColumn('nchar', {
    name: 'ANCHKSTA',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  anchksta: string | null;

  @FixedColumn('nchar', {
    name: 'ANCHKMAI',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  anchkmai: string | null;

  @FixedColumn('nchar', {
    name: 'ANCHKPEC',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  anchkpec: string | null;

  @FixedColumn('nchar', {
    name: 'ANCHKFAX',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  anchkfax: string | null;

  @FixedColumn('nchar', {
    name: 'ANCHKWWP',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  anchkwwp: string | null;

  @FixedColumn('nchar', {
    name: 'ANCHKPTL',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  anchkptl: string | null;

  @FixedColumn('nchar', {
    name: 'ANCHKCPZ',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  anchkcpz: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLGCAU',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflgcau: string | null;

  @FixedColumn('nchar', { name: 'ANCONCAU', nullable: true, length: 15 })
  anconcau: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLIVAD',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflivad: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLRITE',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflrite: string | null;

  @FixedColumn('nchar', { name: 'ANCODSAL', nullable: true, length: 5 })
  ancodsal: string | null;

  @FixedColumn('nchar', {
    name: 'AN_EREDE',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anErede: string | null;

  @FixedColumn('nchar', {
    name: 'ANEVEECC',
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  aneveecc: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLAPCA',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflapca: string | null;

  @FixedColumn('nchar', {
    name: 'ANCODCUC',
    nullable: true,
    length: 2,
    default: () => "'00'",
  })
  ancodcuc: string | null;

  @FixedColumn('nchar', { name: 'ANCODREG', nullable: true, length: 2 })
  ancodreg: string | null;

  @FixedColumn('nchar', { name: 'ANTIPOCL', nullable: true, length: 5 })
  antipocl: string | null;

  @FixedColumn('nchar', {
    name: 'ANCHKFIR',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  anchkfir: string | null;

  @FixedColumn('nchar', { name: 'ANIDRIDY', nullable: true, length: 1 })
  anidridy: string | null;

  @Column('int', { name: 'ANTIIDRI', nullable: true, default: () => '(0)' })
  antiidri: number | null;

  @Column('nvarchar', { name: 'AN_SKYPE', nullable: true, length: 50 })
  anSkype: string | null;

  @FixedColumn('nchar', {
    name: 'ANIVASOS',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anivasos: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLBLLS',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflblls: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLSOAL',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anflsoal: string | null;

  @FixedColumn('nchar', {
    name: 'ANFLBODO',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  anflbodo: string | null;

  @FixedColumn('nchar', {
    name: 'ANOPETRE',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anopetre: string | null;

  @FixedColumn('nchar', {
    name: 'ANTIPPRE',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  antippre: string | null;

  @FixedColumn('nchar', { name: 'ANRATING', nullable: true, length: 2 })
  anrating: string | null;

  @Column('int', { name: 'ANGIORIT', nullable: true, default: () => '(0)' })
  angiorit: number | null;

  @FixedColumn('nchar', { name: 'ANVOCFIN', nullable: true, length: 6 })
  anvocfin: string | null;

  @FixedColumn('nchar', {
    name: 'ANESCDOF',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anescdof: string | null;

  @FixedColumn('nchar', { name: 'ANDESPAR', nullable: true, length: 1 })
  andespar: string | null;

  @FixedColumn('nchar', { name: 'ANPAGFOR', nullable: true, length: 5 })
  anpagfor: string | null;

  @FixedColumn('nchar', {
    name: 'ANCODSNS',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  ancodsns: string | null;

  @Column('nvarchar', { name: 'ANDESCR3', nullable: true, length: 60 })
  andescr3: string | null;

  @Column('nvarchar', { name: 'ANDESCR4', nullable: true, length: 60 })
  andescr4: string | null;

  @Column('nvarchar', { name: 'ANINDIR3', nullable: true, length: 40 })
  anindir3: string | null;

  @Column('nvarchar', { name: 'ANINDIR4', nullable: true, length: 40 })
  anindir4: string | null;

  @Column('nvarchar', { name: 'ANLOCAL2', nullable: true, length: 30 })
  anlocal2: string | null;

  @FixedColumn('nchar', { name: 'ANCODCOM', nullable: true, length: 4 })
  ancodcom: string | null;

  @FixedColumn('nchar', {
    name: 'ANSCIPAG',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anscipag: string | null;

  @FixedColumn('nchar', {
    name: 'ANSPRINT',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  ansprint: string | null;

  @FixedColumn('nchar', {
    name: 'ANCATPAR',
    nullable: true,
    length: 2,
    default: () => "'  '",
  })
  ancatpar: string | null;

  @FixedColumn('nchar', {
    name: 'ANSCHUMA',
    nullable: true,
    length: 1,
    default: () => "'N'",
  })
  anschuma: string | null;

  @FixedColumn('nchar', { name: 'ANFORGIU', nullable: true, length: 3 })
  anforgiu: string | null;

  @Column('int', { name: 'ANFLFOLD', nullable: true, default: () => '(0)' })
  anflfold: number | null;

  @FixedColumn('nchar', { name: 'ANNOTCOR', nullable: true, length: 10 })
  annotcor: string | null;

  @FixedColumn('nchar', { name: 'ANTIPSOG', nullable: true, length: 3 })
  antipsog: string | null;

  @Column('int', { name: 'ANFLGNET', nullable: true, default: () => '(0)' })
  anflgnet: number | null;

  @Column('datetime', {
    name: 'cpupdtms',
    nullable: true,
    default: () => 'getdate()',
  })
  cpupdtms: Date | null;

  @FixedColumn('nchar', {
    name: 'ANRIVBOL',
    nullable: true,
    length: 1,
    default: () => "'S'",
  })
  anrivbol: string | null;

  @Column('decimal', {
    name: 'ANAFFIDA',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  anaffida: number | null;

  @FixedColumn('nchar', {
    name: 'cpccchk',
    nullable: true,
    length: 10,
    default: () => "'qwertyuiop'",
  })
  cpccchk: string | null;

  @OneToMany(() => DesDive, (demodesDive) => demodesDive.conto)
  destinazioni: DesDive[];

  /*
  @OneToMany(() => BaDoccorDemo, (baDoccorDemo) => baDoccorDemo.democonti)
  baDoccorS: BaDoccorDemo[];

  @OneToMany(() => Agenti, (demoagenti) => demoagenti.democonti)
  demoagentis: Agenti[];

  @OneToMany(() => BanConti, (demobanConti) => demobanConti.democonti)
  demobanContis: BanConti[];

  @OneToMany(() => BilDett, (demobilDett) => demobilDett.democonti)
  demobilDetts: BilDett[];

  @OneToMany(() => Categomo, (democategomo) => democategomo.democonti)
  democategomos: Categomo[];

  @OneToMany(() => Categomo, (democategomo) => democategomo.democonti2)
  democategomos2: Categomo[];

  @OneToMany(() => Categomo, (democategomo) => democategomo.democonti3)
  democategomos3: Categomo[];

  @OneToMany(() => CauCont, (democauCont) => democauCont.democonti)
  democauConts: CauCont[];

  @OneToMany(() => Caupri, (democaupri) => democaupri.democonti)
  democaupris: Caupri[];

  @OneToMany(() => Caupri1, (democaupri1) => democaupri1.democonti)
  democaupris2: Caupri1[];

  @OneToMany(() => Collcent, (democollcent) => democollcent.democonti)
  democollcents: Collcent[];

  @OneToMany(() => ConIndi, (democonIndi) => democonIndi.democonti)
  democonIndis: ConIndi[];

  @OneToMany(() => ConIndi, (democonIndi) => democonIndi.democonti2)
  democonIndis2: ConIndi[];

  @OneToMany(() => ConIndi, (democonIndi) => democonIndi.democonti3)
  democonIndis3: ConIndi[];

  @OneToMany(() => ConIndi, (democonIndi) => democonIndi.democonti4)
  democonIndis4: ConIndi[];

  @OneToMany(() => ConTram, (democonTram) => democonTram.democonti)
  democonTrams: ConTram[];

  @ManyToOne(() => Zone, (demozone) => demozone.democontis)
  @JoinColumn([{ name: "ANCODZON", referencedColumnName: "zocodzon" }])
  ancodzon: Zone;

  @ManyToOne(
    () => BaContactADemo,
    (baContactADemo) => baContactADemo.democontis
  )
  @JoinColumn([{ name: "ANCOMPANYID", referencedColumnName: "cocompanyid" }])
  ancompany: BaContactADemo;

  @ManyToOne(() => Metcalsp, (demometcalsp) => demometcalsp.democontis)
  @JoinColumn([{ name: "ANMCALSI", referencedColumnName: "mscodice" }])
  anmcalsi: Metcalsp;

  @ManyToOne(() => Metcalsp, (demometcalsp) => demometcalsp.democontis2)
  @JoinColumn([{ name: "ANMCALST", referencedColumnName: "mscodice" }])
  anmcalst: Metcalsp;

  @ManyToOne(() => Agenti, (demoagenti) => demoagenti.democontis)
  @JoinColumn([{ name: "ANCODAG1", referencedColumnName: "agcodage" }])
  ancodag: Agenti;

  @ManyToOne(() => Valute, (demovalute) => demovalute.democontis)
  @JoinColumn([{ name: "ANCODVAL", referencedColumnName: "vacodval" }])
  ancodval: Valute;

  @ManyToOne(() => DmVfolders, (dmVfolders) => dmVfolders.democontis)
  @JoinColumn([{ name: "ANFOLDER", referencedColumnName: "vfcodiceid" }])
  anfolder: DmVfolders;

  @ManyToOne(() => BaOffices, (baOffices) => baOffices.democontis)
  @JoinColumn([
    { name: "ANCOMPANYID", referencedColumnName: "ofcompanyid" },
    { name: "ANOFFICEID", referencedColumnName: "ofofficeid" },
  ])
  baOffices: BaOffices;

  @ManyToOne(() => Catecomm, (democatecomm) => democatecomm.democontis)
  @JoinColumn([{ name: "ANCATCOM", referencedColumnName: "ctcodice" }])
  ancatcom: Catecomm;

  @ManyToOne(() => CatScma, (democatScma) => democatScma.democontis)
  @JoinColumn([{ name: "ANCATSCM", referencedColumnName: "cscodice" }])
  ancatscm: CatScma;

  @ManyToOne(() => Magazzin, (demomagazzin) => demomagazzin.democontis)
  @JoinColumn([{ name: "ANMAGTER", referencedColumnName: "mgcodmag" }])
  anmagter: Magazzin;

  @ManyToOne(() => Mastri, (demomastri) => demomastri.democontis)
  @JoinColumn([{ name: "ANCONSUP", referencedColumnName: "mccodice" }])
  anconsup2: Mastri;

  @ManyToOne(() => Cacoclfo, (democacoclfo) => democacoclfo.democontis)
  @JoinColumn([{ name: "ANCATCON", referencedColumnName: "c2Codice" }])
  ancatcon: Cacoclfo;

  @ManyToOne(() => Modcldat, (demomodcldat) => demomodcldat.democontis)
  @JoinColumn([{ name: "ANMTDCLC", referencedColumnName: "mdcodice" }])
  anmtdclc: Modcldat;

  @ManyToOne(() => Vociiva, (demovociiva) => demovociiva.democontis)
  @JoinColumn([{ name: "ANCODIVA", referencedColumnName: "ivcodiva" }])
  ancodiva: Vociiva;

  @ManyToOne(() => Nazioni, (demonazioni) => demonazioni.democontis)
  @JoinColumn([{ name: "ANNAZION", referencedColumnName: "nacodnaz" }])
  annazion: Nazioni;

  @ManyToOne(() => Listini, (demolistini) => demolistini.democontis)
  @JoinColumn([{ name: "ANNUMLIS", referencedColumnName: "lscodlis" }])
  annumlis: Listini;

  @ManyToOne(() => GrpDefa, (demogrpDefa) => demogrpDefa.democontis)
  @JoinColumn([{ name: "ANGRPDEF", referencedColumnName: "gdcodice" }])
  angrpdef: GrpDefa;

  @ManyToOne(() => BanChe, (demobanChe) => demobanChe.democontis)
  @JoinColumn([{ name: "ANCODBAN", referencedColumnName: "bacodban" }])
  ancodban: BanChe;

  @ManyToOne(() => Tipcodiv, (demotipcodiv) => demotipcodiv.democontis)
  @JoinColumn([
    { name: "ANCATOPE", referencedColumnName: "tiTipo" },
    { name: "ANTIPOPE", referencedColumnName: "ticodice" },
  ])
  demotipcodiv: Tipcodiv;

  @ManyToOne(() => PagAmen, (demopagAmen) => demopagAmen.democontis)
  @JoinColumn([{ name: "ANCODPAG", referencedColumnName: "pacodice" }])
  ancodpag: PagAmen;

  @ManyToOne(() => Grupro, (demogrupro) => demogrupro.democontis)
  @JoinColumn([{ name: "ANGRUPRO", referencedColumnName: "gpcodice" }])
  angrupro: Grupro;

  @ManyToOne(() => GruInte, (demogruInte) => demogruInte.democontis)
  @JoinColumn([{ name: "ANCODGRU", referencedColumnName: "grcodice" }])
  ancodgru: GruInte;

  @ManyToOne(() => Lingue, (demolingue) => demolingue.democontis)
  @JoinColumn([{ name: "ANCODLIN", referencedColumnName: "lucodice" }])
  ancodlin: Lingue;

  @OneToMany(() => Contveac, (democontveac) => democontveac.democonti)
  democontveacs: Contveac[];

  @OneToMany(() => Contveac, (democontveac) => democontveac.democonti2)
  democontveacs2: Contveac[];

  @OneToMany(() => Contveac, (democontveac) => democontveac.democonti3)
  democontveacs3: Contveac[];

  @OneToMany(() => Contveac, (democontveac) => democontveac.democonti4)
  democontveacs4: Contveac[];

  @OneToMany(() => Contveac, (democontveac) => democontveac.democonti5)
  democontveacs5: Contveac[];

  @OneToMany(() => Contveac, (democontveac) => democontveac.democonti6)
  democontveacs6: Contveac[];

  @OneToMany(() => Contveac, (democontveac) => democontveac.democonti7)
  democontveacs7: Contveac[];

  @OneToMany(() => Contveac, (democontveac) => democontveac.democonti8)
  democontveacs8: Contveac[];

  @OneToMany(() => Detgruiv, (demodetgruiv) => demodetgruiv.democonti)
  demodetgruivs: Detgruiv[];

  @OneToMany(() => Dettricl, (demodettricl) => demodettricl.democonti)
  demodettricls: Dettricl[];

  @OneToOne(() => DfConti, (demodfConti) => demodfConti.democonti)
  demodfConti: DfConti;

  @OneToMany(() => DicInte, (demodicInte) => demodicInte.democonti)
  demodicIntes: DicInte[];

  @OneToMany(() => DocDett, (demodocDett) => demodocDett.democonti)
  demodocDetts: DocDett[];

  @OneToMany(() => DocDett, (demodocDett) => demodocDett.democonti2)
  demodocDetts2: DocDett[];

  @OneToMany(() => DocMast, (demodocMast) => demodocMast.democonti)
  demodocMasts: DocMast[];

  @OneToOne(() => EcConti, (demoecConti) => demoecConti.democonti)
  demoecConti: EcConti;

  @OneToMany(() => Eleimast, (demoeleimast) => demoeleimast.democonti)
  demoeleimasts: Eleimast[];

  @OneToMany(() => FatDiff, (demofatDiff) => demofatDiff.democonti)
  demofatDiffs: FatDiff[];

  @OneToMany(() => FatDiff, (demofatDiff) => demofatDiff.democonti2)
  demofatDiffs2: FatDiff[];

  @OneToMany(() => KeyArti, (demokeyArti) => demokeyArti.democonti)
  demokeyArtis: KeyArti[];

  @OneToMany(() => LisForn, (demolisForn) => demolisForn.democonti)
  demolisForns: LisForn[];

  @OneToMany(() => Lottiart, (demolottiart) => demolottiart.democonti)
  demolottiarts: Lottiart[];

  @OneToMany(() => Magazzin, (demomagazzin) => demomagazzin.democonti)
  demomagazzins: Magazzin[];

  @OneToMany(() => ManDati, (demomanDati) => demomanDati.democonti)
  demomanDatis: ManDati[];

  @OneToMany(() => Messaggi, (demomessaggi) => demomessaggi.democonti)
  demomessaggis: Messaggi[];

  @OneToMany(() => MisMast, (demomisMast) => demomisMast.democonti)
  demomisMasts: MisMast[];

  @OneToMany(() => ModCont, (demomodCont) => demomodCont.democonti)
  demomodConts: ModCont[];

  @OneToMany(() => MopMast, (demomopMast) => demomopMast.democonti)
  demomopMasts: MopMast[];

  @OneToMany(() => MovRite, (demomovRite) => demomovRite.democonti)
  demomovRites: MovRite[];

  @OneToMany(() => MvmMast, (demomvmMast) => demomvmMast.democonti)
  demomvmMasts: MvmMast[];

  @OneToMany(() => Pagmescl, (demopagmescl) => demopagmescl.democonti)
  demopagmescls: Pagmescl[];

  @OneToMany(() => PntDett, (demopntDett) => demopntDett.democonti)
  demopntDetts: PntDett[];

  @OneToMany(() => PntIva, (demopntIva) => demopntIva.democonti)
  demopntIvas: PntIva[];

  @OneToMany(() => PntIva, (demopntIva) => demopntIva.democonti2)
  demopntIvas2: PntIva[];

  @OneToMany(() => PntIva, (demopntIva) => demopntIva.democonti3)
  demopntIvas3: PntIva[];

  @OneToMany(() => PntMast, (demopntMast) => demopntMast.democonti)
  demopntMasts: PntMast[];

  @OneToMany(() => RapMode, (demorapMode) => demorapMode.democonti)
  demorapModes: RapMode[];

  @OneToMany(() => Saldicon, (demosaldicon) => demosaldicon.democonti)
  demosaldicons: Saldicon[];

  @OneToMany(() => Salmdaco, (demosalmdaco) => demosalmdaco.democonti)
  demosalmdacos: Salmdaco[];

  @OneToMany(() => Salmdaco, (demosalmdaco) => demosalmdaco.democonti2)
  demosalmdacos2: Salmdaco[];

  @OneToMany(() => Salmdaco, (demosalmdaco) => demosalmdaco.democonti3)
  demosalmdacos3: Salmdaco[];

  @OneToMany(() => Salmdaco, (demosalmdaco) => demosalmdaco.democonti4)
  demosalmdacos4: Salmdaco[];

  @OneToMany(() => Salmdaco, (demosalmdaco) => demosalmdaco.democonti5)
  demosalmdacos5: Salmdaco[];

  @OneToMany(() => ScaVari, (demoscaVari) => demoscaVari.democonti)
  demoscaVaris: ScaVari[];

  @OneToMany(() => SedStor, (demosedStor) => demosedStor.democonti)
  demosedStors: SedStor[];

  @OneToOne(() => SitFidi, (demositFidi) => demositFidi.democonti)
  demositFidi: SitFidi;

  @OneToMany(() => StrInte, (demostrInte) => demostrInte.democonti)
  demostrIntes: StrInte[];

  @OneToMany(() => Vettori, (demovettori) => demovettori.democonti)
  demovettoris: Vettori[];

  @OneToOne(() => EtCescomDemo, (etCescomDemo) => etCescomDemo.democonti)
  etCescomDemo: EtCescomDemo;

  @OneToOne(() => EtContiDemo, (etContiDemo) => etContiDemo.democonti)
  etContiDemo: EtContiDemo;

  @OneToMany(() => IpBuoniDemo, (ipBuoniDemo) => ipBuoniDemo.democonti)
  ipBuoniS: IpBuoniDemo[];

  @OneToMany(() => IpDocumeMDemo, (ipDocumeMDemo) => ipDocumeMDemo.democonti)
  ipDocumeMS: IpDocumeMDemo[];

  @OneToMany(() => IpDocumeDemo, (ipDocumeDemo) => ipDocumeDemo.democonti)
  ipDocumeS: IpDocumeDemo[];

  @OneToMany(() => IpFidelrapDemo, (ipFidelrapDemo) => ipFidelrapDemo.democonti)
  ipFidelrapS: IpFidelrapDemo[];

  @OneToMany(() => IpMovfcaDemo, (ipMovfcaDemo) => ipMovfcaDemo.democonti)
  ipMovfcaS: IpMovfcaDemo[];

  @OneToMany(() => IpRefcclaDemo, (ipRefcclaDemo) => ipRefcclaDemo.democonti)
  ipRefcclaS: IpRefcclaDemo[];

  @OneToMany(() => IpStopayDemo, (ipStopayDemo) => ipStopayDemo.democonti)
  ipStopayS: IpStopayDemo[];

  @OneToMany(() => IpStoreDemo, (ipStoreDemo) => ipStoreDemo.democonti)
  ipStoreS: IpStoreDemo[];

  @OneToMany(() => IpStoreDemo, (ipStoreDemo) => ipStoreDemo.democonti2)
  ipStoreS2: IpStoreDemo[];

  @OneToMany(() => IpStoreDemo, (ipStoreDemo) => ipStoreDemo.democonti3)
  ipStoreS3: IpStoreDemo[];

  @OneToMany(() => IpStoreDemo, (ipStoreDemo) => ipStoreDemo.democonti4)
  ipStoreS4: IpStoreDemo[];

  @OneToOne(
    () => RiCliforconDemo,
    (riCliforconDemo) => riCliforconDemo.democonti
  )
  riCliforconDemo: RiCliforconDemo;*/
}
