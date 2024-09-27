import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('PK_RAVAS_COFFEE_ALLEGATI', ['id'], { unique: true })
@Entity('_COFFEE_ALLEGATI', { schema: 'dbo' })
export class Allegati {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nchar', { name: 'nome_file_originale', nullable: true, length: 200 })
  nomeFileOriginale: string | null;

  @Column('nchar', { name: 'percorso_originale', nullable: true, length: 500 })
  percorsoOriginale: string | null;

  @Column('nchar', { name: 'estensione', nullable: true, length: 10 })
  estensione: string | null;

  @Column('nchar', {
    name: 'percorso_archiviazione',
    nullable: true,
    length: 500,
  })
  percorsoArchiviazione: string | null;

  @Column('nchar', {
    name: 'nome_file_archiviato',
    nullable: true,
    length: 200,
  })
  nomeFileArchiviato: string | null;

  @Column('nchar', { name: 'tipo_file', nullable: true, length: 10 })
  tipoFile: string | null;

  @Column('nchar', { name: 'descrizione', nullable: true, length: 100 })
  descrizione: string | null;

  @Column('nchar', { name: 'note', nullable: true, length: 500 })
  note: string | null;

  @Column('nchar', {
    name: 'collegamento_a_tabella',
    nullable: true,
    length: 50,
  })
  collegamentoATabella: string | null;

  @Column('nchar', { name: 'collegamento_a_campo', nullable: true, length: 50 })
  collegamentoACampo: string | null;

  @Column('nchar', { name: 'valore_campo', nullable: true, length: 50 })
  valoreCampo: string | null;

  @Column('datetime', { name: 'data_archiviazione', nullable: true })
  dataArchiviazione: Date | null;
}
