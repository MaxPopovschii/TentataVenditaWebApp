/* eslint-disable prettier/prettier */
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { ClientoID } from '../../../common/src';

@Entity('_COFFEE_EXTEND_CLIFOR')
export class Clienti {
  @PrimaryColumn('nvarchar', { name: 'TIPO_CONTO', length: 1 })
  tipoConto: string;
  @PrimaryColumn('nvarchar', { name: 'CODICE_CONTO', length: 15 })
  codiceConto: string;

  get ID() {
    return ClientoID.compute(this);
  }

  set ID(id: string) {
    const parseID = ClientoID.parse(id);
    this.tipoConto = parseID.tipoConto;
    this.codiceConto = parseID.codiceConto;
  }

  @Column('decimal', { name: 'CONSUMO_MINIMO', nullable: true })
  consumoMin: number;
  @Column('decimal', { name: 'CONSUMO_MINIMO_CAFFE', nullable: true })
  consumoMinCaffe: number;
  @Column('nchar', { name: 'RAGGRUPPA_PER_SEDE', nullable: true, length: 1 })
  raggruppaPerSede: string | null;
  @Column('nchar', { name: 'FORZA_UNICO_PAGAMENTO', nullable: true, length: 1 })
  forzaUnicoPagamento: string | null;
  @Column('varchar', {
    name: 'RAGIONE_SOCIALE_CORTA',
    nullable: true,
    length: 40,
  })
  ragioneSocialeCorta: string | null;

  @Column('varchar', {
    name: 'RAGIONE_SOCIALE_BI',
    length: 100,
    nullable: true,
  })
  ragSocBI: string | null;
}
