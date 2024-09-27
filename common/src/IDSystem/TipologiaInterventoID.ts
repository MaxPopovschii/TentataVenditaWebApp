export interface ITipoologiaInterventoID {
  tipoAttrezzatura: string;
  tipoIntervento: string;
}
export class TipoologiaInterventoID {
  static compute(id: ITipoologiaInterventoID): string {
    return JSON.stringify([id.tipoAttrezzatura, id.tipoIntervento]);
  }
  static parse(id: string): ITipoologiaInterventoID {
    const [tipoAttrezzatura, tipoIntervento] = JSON.parse(id);
    return { tipoAttrezzatura, tipoIntervento };
  }
}
