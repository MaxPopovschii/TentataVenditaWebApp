export interface IMaturID {
  mpSerial: string;
  numRow: number;
}

export class MaturID {
  static compute(id: IMaturID): string {
    return JSON.stringify([id.mpSerial, id.numRow]);
  }

  static parse(id: string): IMaturID {
    const { mpSerial, numRow } = JSON.parse(id);
    return { mpSerial, numRow };
  }
}
