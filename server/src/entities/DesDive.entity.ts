import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Conti } from './Conti.entity';
import { DestinazioneID } from '../../../common/src/index';
import { FixedColumn, FixedPrimaryColumn } from '../FixedColumn';
import { DesDiveGet } from '../dto/DesDive.dto';

@Entity('DES_DIVE', { schema: 'dbo' })
export class DesDive {
  get ID() {
    return DestinazioneID.compute(this);
  }

  get humanReadableID() {
    return this.ddcoddes;
  }

  @FixedPrimaryColumn('nchar', { name: 'DDTIPCON', length: 1 })
  ddtipcon: string;

  @FixedPrimaryColumn('nchar', { name: 'DDCODICE', length: 15 })
  ddcodice: string;

  @FixedPrimaryColumn('nchar', { name: 'DDCODDES', length: 5 })
  ddcoddes: string;

  @Column('nvarchar', { name: 'DDNOMDES', nullable: true, length: 40 })
  ddnomdes: string | null;

  @Column('nvarchar', { name: 'DDINDIRI', nullable: true, length: 40 })
  ddindiri: string | null;

  @FixedColumn('nchar', { name: 'DD___CAP', nullable: true, length: 10 })
  ddCap: string | null;

  @Column('nvarchar', { name: 'DDLOCALI', nullable: true, length: 50 })
  ddlocali: string | null;

  @FixedColumn('nchar', { name: 'DDPROVIN', nullable: true, length: 5 })
  ddprovin: string | null;

  @FixedColumn('nchar', { name: 'DDCODNAZ', nullable: true, length: 3 })
  ddcodnaz: string | null;

  @Column('nvarchar', { name: 'DDPERSON', nullable: true, length: 40 })
  ddperson: string | null;

  @Column('nvarchar', { name: 'DD__NOTE', nullable: true, length: 40 })
  ddNote: string | null;

  @FixedColumn('nchar', { name: 'DDTELEFO', nullable: true, length: 18 })
  ddtelefo: string | null;

  @Column('nvarchar', { name: 'DD_EMAIL', nullable: true, length: 254 })
  ddEmail: string | null;

  @Column('nvarchar', { name: 'DD_EMPEC', nullable: true, length: 254 })
  ddEmpec: string | null;

  @FixedColumn('nchar', { name: 'DDTIPRIF', nullable: true, length: 2 })
  ddtiprif: string | null;

  @FixedColumn('nchar', { name: 'DDPREDEF', nullable: true, length: 1 })
  ddpredef: string | null;

  @Column('date', { name: 'DDDTOBSO', nullable: true })
  dddtobso: Date | null;

  @FixedColumn('nchar', { name: 'DDNUMFAX', nullable: true, length: 18 })
  ddnumfax: string | null;

  @FixedColumn('nchar', { name: 'DDMCCODI', nullable: true, length: 5 })
  ddmccodi: string | null;

  @FixedColumn('nchar', { name: 'DDMCCODT', nullable: true, length: 5 })
  ddmccodt: string | null;

  @FixedColumn('nchar', { name: 'DDRFDICH', nullable: true, length: 15 })
  ddrfdich: string | null;

  @FixedColumn('nchar', { name: 'DDTELFAX', nullable: true, length: 18 })
  ddtelfax: string | null;

  @FixedColumn('nchar', { name: 'DDTIPINF', nullable: true, length: 3 })
  ddtipinf: string | null;

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

  @ManyToOne(() => Conti, (democonti) => democonti.destinazioni)
  @JoinColumn([
    { name: 'DDTIPCON', referencedColumnName: 'antipcon' },
    { name: 'DDCODICE', referencedColumnName: 'ancodice' },
  ])
  conto: Conti;

  /*
  @ManyToOne(() => Agenti, (demoagenti) => demoagenti.demodesDives)
  @JoinColumn([{ name: "DDCODAGE", referencedColumnName: "agcodage" }])
  ddcodage: Agenti;

  @ManyToOne(() => BaOffices, (baOffices) => baOffices.demodesDives)
  @JoinColumn([
    { name: "DDCOMPANYID", referencedColumnName: "ofcompanyid" },
    { name: "DDOFFICEID", referencedColumnName: "ofofficeid" },
  ])
  baOffices: BaOffices;

  @ManyToOne(() => Tipcodiv, (demotipcodiv) => demotipcodiv.demodesDives)
  @JoinColumn([
    { name: "DDCATOPE", referencedColumnName: "tiTipo" },
    { name: "DDTIPOPE", referencedColumnName: "ticodice" },
  ])
  demotipcodiv: Tipcodiv;

  @ManyToOne(() => Vettori, (demovettori) => demovettori.demodesDives)
  @JoinColumn([{ name: "DDCODVET", referencedColumnName: "vtcodvet" }])
  ddcodvet: Vettori;

  @ManyToOne(() => Modasped, (demomodasped) => demomodasped.demodesDives)
  @JoinColumn([{ name: "DDCODSPE", referencedColumnName: "spcodspe" }])
  ddcodspe: Modasped;

  @ManyToOne(() => Porti, (demoporti) => demoporti.demodesDives)
  @JoinColumn([{ name: "DDCODPOR", referencedColumnName: "pocodpor" }])
  ddcodpor: Porti;

  @OneToOne(() => Ecdesdiv, (demoecdesdiv) => demoecdesdiv.demodesDive)
  demoecdesdiv: Ecdesdiv;

  @OneToOne(
    () => EtSedcescomDemo,
    (etSedcescomDemo) => etSedcescomDemo.demodesDive
  )
  etSedcescomDemo: EtSedcescomDemo;

  @OneToMany(() => IpDocumeMDemo, (ipDocumeMDemo) => ipDocumeMDemo.demodesDive)
  ipDocumeMS: IpDocumeMDemo[];
  */
}
