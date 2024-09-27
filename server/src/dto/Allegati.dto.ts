import { PartialType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class AllegatiBasic {
  @Expose() id: number;
  @Expose() nomeFileOriginale: string;
  @Expose() percorsoOriginale: string;
  @Expose() estensione: string;
  @Expose() percorsoArchiviazione: string;
  @Expose() nomeFileArchiviato: string;
  @Expose() tipoFile: string;
  @Expose() descrizione: string;
  @Expose() note: string;
  @Expose() collegamentoATabella: string;
  @Expose() collegamentoACampo: string;
  @Expose() valoreCampo: string;
  @Expose() dataArchiviazione: Date;
}

export class SearchAllegatiParameters {
  @Type(() => String)
  @IsString()
  collegamentoATabella: string;
  @Type(() => String)
  @IsString()
  collegamentoACampo: string;
  @Type(() => String)
  @IsString()
  valoreCampo: string;
}

export class AllegatiPart extends PartialType(AllegatiBasic) {}
