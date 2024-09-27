export interface IDocDettID {
  mvserial: string;
  cprownum: number;
}
export class DocDettID {
  static compute(id: IDocDettID): string {
    return JSON.stringify([id.mvserial, id.cprownum]);
  }
  static parse(id: string): IDocDettID {
    const [mvserial, cprownum] = JSON.parse(id);
    return { mvserial, cprownum };
  }
}
