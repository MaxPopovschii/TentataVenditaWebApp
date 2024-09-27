export interface IContoID {
  antipcon: string;
  ancodice: string;
}
export class ContoID {
  static compute(id: IContoID): string {
    return JSON.stringify([id.antipcon, id.ancodice]);
  }
  static parse(id: string): IContoID {
    const [antipcon, ancodice] = JSON.parse(id);
    return { antipcon, ancodice };
  }
}
