export interface IMatricolaID {
  amkeysal: string;
  amcodice: string;
}
export class MatricolaID {
  static compute(id: IMatricolaID): string {
    return JSON.stringify([id.amkeysal, id.amcodice]);
  }
  static parse(id: string): IMatricolaID {
    const [amkeysal, amcodice] = JSON.parse(id);
    return { amkeysal, amcodice };
  }
}
