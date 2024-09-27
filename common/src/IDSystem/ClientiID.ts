export interface IClientoID {
  tipoConto: string;
  codiceConto: string;
}

export class ClientoID {
  // Converts IClientoID into a JSON string representing an array
  static compute(id: IClientoID): string {
    return JSON.stringify([id.tipoConto, id.codiceConto]);
  }

  // Parses the JSON string and returns the corresponding IClientoID
  static parse(id: string): IClientoID {
    const [tipoConto, codiceConto] = JSON.parse(id); // Parse as an array
    return { tipoConto, codiceConto };
  }
}
