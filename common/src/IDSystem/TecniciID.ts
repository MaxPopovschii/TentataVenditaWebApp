export interface ITecnicoID {
  codice: string;
}

export class TecnicoID {
  static compute(id: ITecnicoID): string {
    return JSON.stringify(id.codice);
  }

  static parse(id: string): ITecnicoID {
    const codice = JSON.parse(id);
    return { codice };
  }
}
