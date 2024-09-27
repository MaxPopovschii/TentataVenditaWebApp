export interface IDestinazioneID {
  ddtipcon: string;
  ddcodice: string;
  ddcoddes: string;
}
export class DestinazioneID {
  static compute(id: IDestinazioneID): string {
    return JSON.stringify([id.ddtipcon, id.ddcodice, id.ddcoddes]);
  }
  static parse(id: string): IDestinazioneID {
    const [ddtipcon, ddcodice, ddcoddes] = JSON.parse(id);
    return { ddtipcon, ddcodice, ddcoddes };
  }
}
