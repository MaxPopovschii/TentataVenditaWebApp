export interface IComodatoContrattoDettagliID {
  idContratto: number;
  keyArt: string;
  codiceArticolo: string;
  codiceMatricola: string;
}
export class ComodatoContrattoDettagliID {
  static compute(id: IComodatoContrattoDettagliID): string {
    return JSON.stringify([
      id.idContratto,
      id.keyArt,
      id.codiceArticolo,
      id.codiceMatricola,
    ]);
  }
  static parse(id: string): IComodatoContrattoDettagliID {
    const [idContratto, keyArt, codiceArticolo, codiceMatricola] =
      JSON.parse(id);
    return { idContratto, keyArt, codiceArticolo, codiceMatricola };
  }
}
