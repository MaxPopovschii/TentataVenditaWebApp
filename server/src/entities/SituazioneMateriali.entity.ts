import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('_SITUAZIONE_MATERIALE_IN_USO')
export class SituazioneMateriali {
  @PrimaryColumn('varchar', { name: 'codice_articolo', length: 20 })
  articolo: string;

  @Column('nvarchar', { name: 'descrizione_articolo', length: 40 })
  descrizione_articolo: string;

  @Column('nvarchar', { name: 'matricola_fornitore', length: 25 })
  matricola_fornitore: string;

  @Column('varchar', { name: 'matricola_interna', length: 50 })
  matricola_interna: string;

  @Column('varchar', { name: 'destinazione_diversa', length: 5 })
  destinazione_diversa: string;

  @Column('int', { name: 'nr_doc_consegna' })
  nr_doc_consegna: number;

  @Column('varchar', { name: 'alfa_doc_consegna', length: 15 })
  alfa_doc_consegna: string;

  @Column('date', { name: 'data_doc_consegna' })
  data_doc_consegna: Date;

  @Column('decimal', { name: 'GiorniUtilizzoInUso' })
  giorniUtilizzoInUso: number;

  @Column('decimal', { name: 'GiorniUtilizzoRitirati' })
  giorniUtilizzoRitirati: number;

  @Column('varchar', { name: 'TIPO_CONTO', length: 1 })
  tipo_conto: string;

  @Column('varchar', { name: 'codice_cliente', length: 15 })
  codice_cliente: string;

  @Column('nvarchar', { name: 'ragione_sociale', length: 60 })
  ragione_sociale: string;

  @Column('date', { name: 'data_fine_contratto' })
  data_fine_contratto: Date;

  @Column('nchar', { name: 'codice_agente', length: 5 })
  codice_agente: string;

  @Column('decimal', { name: 'importo_acquisto', precision: 18, scale: 5 })
  importo_acquisto: number;

  @Column('varchar', { name: 'In_Uso', length: 1 })
  In_Uso: string;

  @Column('int', { name: 'NRO_CONTRATTO' })
  NRO_CONTRATTO: number;

  @Column('nvarchar', { name: 'DDNOMDES', length: 40 })
  DDNOMDES: string;

  @Column('nvarchar', { name: 'DDINDIRI', length: 40 })
  DDINDIRI: string;

  @Column('nchar', { name: 'DD___CAP', length: 10 })
  DD___CAP: string;

  @Column('nvarchar', { name: 'DDLOCALI', length: 50 })
  DDLOCALI: string;

  @Column('nchar', { name: 'DDPROVIN', length: 5 })
  DDPROVIN: string;
}
