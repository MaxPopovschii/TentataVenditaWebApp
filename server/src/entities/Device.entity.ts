import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('_COFFEE_DEVICE', { schema: 'dbo' })
export class Device {
  @PrimaryGeneratedColumn({ type: 'int', name: 'DEVICE_ID' })
  deviceId: number;

  @Column('varchar', { primary: true, name: 'GUID', length: 100 })
  guid: string;

  @Column('varchar', { name: 'DEVICE_NAME', length: 50 })
  deviceName: string;

  @Column('nchar', { name: 'CODICE_AGENTE', nullable: true, length: 5 })
  codiceAgente: string | null;

  @Column('bit', { name: 'IS_ACTIVE' })
  isActive: boolean;
}
