export interface IContrattiScontoDettagliID {
  nrContratto: string;
  riga: number;
}
export class ContrattiScontoDettagliID {
  static compute(id: IContrattiScontoDettagliID): string {
    return JSON.stringify([id.nrContratto, id.riga]);
  }
  static parse(id: string): IContrattiScontoDettagliID {
    const [nrContratto, riga] = JSON.parse(id);
    return { nrContratto, riga };
  }
}
