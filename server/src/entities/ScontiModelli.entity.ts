import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
@Entity('_COFFEE_SCONTI_MODELLI')
export class ScontiModelli {
  @PrimaryColumn('varchar', {
    name: 'CODICE_TIPO_CONTRATTO',
    length: 10,
  })
  ID: string;

  get humanReadableID() {
    return this.ID;
  }

  @Column('varchar', { name: 'DESCRIZIONE', nullable: true, length: 100 })
  descrizione: string | null;

  @Column('varchar', { name: 'TIPO_SCONTO', nullable: true, length: 50 })
  tipoSconto: string | null;

  @Column('bit', { name: 'ABILITA_IMPORTO_LIMITE_MAX', nullable: true })
  abilitaImportoLimiteMax: boolean | null;

  @Column('bit', { name: 'ABILITA_QTA_SOGLIA_MINIMA', nullable: true })
  abilitaQtaSogliaMinima: boolean | null;

  @Column('bit', { name: 'ABILITA_QTA_OMAGGIARE', nullable: true })
  abilitaQtaOmaggiare: boolean | null;

  @Column('varchar', {
    name: 'SCONTA_VALORE_MERCE',
    nullable: true,
    length: 50,
  })
  scontaValoreMerce: string | null;

  @Column('int', { name: 'NR_MESI_BASE_CALCOLO', nullable: true })
  nrMesiBaseCalcolo: number | null;

  @Column('bit', { name: 'APPLICA_NOTA_CREDITO', nullable: true })
  applicaNotaCredito: boolean | null;
}
