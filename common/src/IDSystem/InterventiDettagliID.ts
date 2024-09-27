export interface IInterventoDettagliID {
  idIntervento: number;
  riga: number;
}
export class InterventoDettagliID {
  static compute(id: IInterventoDettagliID): string {
    return JSON.stringify([id.idIntervento, id.riga]);
  }
  static parse(id: string): IInterventoDettagliID {
    const [idIntervento, riga] = JSON.parse(id);
    return { idIntervento, riga };
  }
}
