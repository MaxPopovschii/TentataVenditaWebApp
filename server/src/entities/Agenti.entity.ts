import { Column, Entity, Index } from 'typeorm';
import { TecnicoID } from '../../../common/src';

@Index('PK_RAVASAGENTI', ['agcodage'], { unique: true })
@Index('RAVASAGENTI2', ['agdesage'], {})
@Index('RAVASAGENTI3', ['agtipfor', 'agcodfor'], {})
@Entity('AGENTI', { schema: 'dbo' })
export class Agenti {
  @Column('nchar', { primary: true, name: 'AGCODAGE', length: 5 })
  agcodage: string;

  @Column('nvarchar', { name: 'AGDESAGE', nullable: true, length: 60 })
  agdesage: string | null;

  @Column('nvarchar', { name: 'AGINDAGE', nullable: true, length: 40 })
  agindage: string | null;

  @Column('nvarchar', { name: 'AGCITAGE', nullable: true, length: 50 })
  agcitage: string | null;

  @Column('nchar', { name: 'AGPROAGE', nullable: true, length: 5 })
  agproage: string | null;

  @Column('nchar', { name: 'AGFISAGE', nullable: true, length: 16 })
  agfisage: string | null;

  @Column('nchar', { name: 'AGTIPAGE', nullable: true, length: 1 })
  agtipage: string | null;

  @Column('nchar', { name: 'AGCZOAGE', nullable: true, length: 5 })
  agczoage: string | null;

  @Column('nchar', { name: 'AGCODENA', nullable: true, length: 15 })
  agcodena: string | null;

  @Column('nchar', { name: 'AGFLAZIE', nullable: true, length: 1 })
  agflazie: string | null;

  @Column('nchar', {
    name: 'AGTIPFOR',
    nullable: true,
    length: 1,
    default: () => "'F'",
  })
  agtipfor: string | null;

  @Column('nchar', { name: 'AGCODFOR', nullable: true, length: 15 })
  agcodfor: string | null;

  @Column('nchar', { name: 'AGTELEFO', nullable: true, length: 18 })
  agtelefo: string | null;

  @Column('nchar', { name: 'AGFLESCL', nullable: true, length: 1 })
  agflescl: string | null;

  @Column('date', { name: 'AGDTINIT', nullable: true })
  agdtinit: Date | null;

  @Column('date', { name: 'AGDTOBSO', nullable: true })
  agdtobso: Date | null;

  @Column('decimal', {
    name: 'AGRITIRP',
    nullable: true,
    precision: 5,
    scale: 2,
    default: () => '(0)',
  })
  agritirp: number | null;

  @Column('decimal', {
    name: 'AGPERIMP',
    nullable: true,
    precision: 6,
    scale: 2,
    default: () => '(0)',
  })
  agperimp: number | null;

  @Column('nchar', { name: 'AGFLFARI', nullable: true, length: 1 })
  agflfari: string | null;

  @Column('nchar', { name: 'AGFLFIRR', nullable: true, length: 1 })
  agflfirr: string | null;

  @Column('nchar', { name: 'AGSCOPAG', nullable: true, length: 1 })
  agscopag: string | null;

  @Column('nchar', { name: 'AGAGECAP', nullable: true, length: 10 })
  agagecap: string | null;

  @Column('date', { name: 'AGINIENA', nullable: true })
  aginiena: Date | null;

  @Column('date', { name: 'AGFINENA', nullable: true })
  agfinena: Date | null;

  @Column('nchar', {
    name: 'AGFLGCPZ',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  agflgcpz: string | null;

  @Column('nchar', {
    name: 'AGCHKSTA',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  agchksta: string | null;

  @Column('nchar', {
    name: 'AGCHKMAI',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  agchkmai: string | null;

  @Column('nchar', {
    name: 'AGCHKPEC',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  agchkpec: string | null;

  @Column('nchar', {
    name: 'AGCHKFAX',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  agchkfax: string | null;

  @Column('nchar', {
    name: 'AGCHKPTL',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  agchkptl: string | null;

  @Column('nchar', {
    name: 'AGCHKCPZ',
    nullable: true,
    length: 1,
    default: () => "' '",
  })
  agchkcpz: string | null;

  @Column('nvarchar', { name: 'AG_EMAIL', nullable: true, length: 254 })
  agEmail: string | null;

  @Column('nvarchar', { name: 'AG_EMPEC', nullable: true, length: 254 })
  agEmpec: string | null;

  @Column('nchar', { name: 'AGTELFAX', nullable: true, length: 18 })
  agtelfax: string | null;

  @Column('int', { name: 'AGFLFOLD', nullable: true, default: () => '(0)' })
  agflfold: number | null;

  @Column('nchar', { name: 'AGNOTCOR', nullable: true, length: 10 })
  agnotcor: string | null;

  @Column('nchar', {
    name: 'AGTIPSOG',
    nullable: true,
    length: 3,
    default: () => "'AGE'",
  })
  agtipsog: string | null;

  @Column('datetime', {
    name: 'cpupdtms',
    nullable: true,
    default: () => 'getdate()',
  })
  cpupdtms: Date | null;

  @Column('nchar', { name: 'AGFORGIU', nullable: true, length: 3 })
  agforgiu: string | null;

  @Column('nchar', {
    name: 'cpccchk',
    nullable: true,
    length: 10,
    default: () => "'qwertyuiop'",
  })
  cpccchk: string | null;
}
