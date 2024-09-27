import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('_LISTINI_TUTTI')
export class Listini {
  @PrimaryColumn('nvarchar', { name: 'Codice_Articolo', length: 50 })
  codice_articolo: string;
  @Column('nvarchar', { name: 'Descrizione_Articolo', length: 40 })
  descrizione_articolo: string;
  @Column('nchar', { name: 'LICODART', length: 20 })
  LICODART: string;
  @Column('nchar', { name: 'Codice_Listino', length: 5 })
  codice_listino: string;
  @Column('nvarchar', { name: 'Descrizione_Listino', length: 40 })
  descrizione_listino: string;
  @Column('decimal', { name: 'Prezzo', precision: 18, scale: 5 })
  prezzo: number;
  @Column('date', { name: 'Data_Attivazione' })
  data_attivazione: Date | null;
  @Column('date', { name: 'Fine_Validita' })
  fine_validita: Date | null;
}
