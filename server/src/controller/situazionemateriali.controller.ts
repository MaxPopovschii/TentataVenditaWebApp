import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BasicController } from 'src/basic.controller';
import { SituazioneMaterialiFilters as Filters } from 'src/dto/SituazioneMateriali.dto';
import { SituazioneMateriali as Entity } from 'src/entities/SituazioneMateriali.entity';
import { SituazioneMaterialiView as EntityView } from 'src/dto/SituazioneMateriali.dto';

@Controller('materiali')
//@ApiTags('materiali')
export class SituazioneMaterialiController extends BasicController {
  @Get('/view')
  @ApiOkResponse()
  async list(@Query() param: Filters) {
    return this.trx(async (em) => {
      const parsed = JSON.parse(param.ragione_sociale);
      const codice = parsed[1];
      const q = em.getRepository(Entity).createQueryBuilder('m');
      const entites =
        param.In_Uso == 'SN'
          ? q
              .where('m.codice_cliente = :codice', {
                codice,
              })
              .getMany()
          : q
              .where('m.codice_cliente = :codice', {
                codice,
              })
              .andWhere('m.In_Uso = :uso', {
                uso: param.In_Uso,
              })
              .getMany();
      return this.toDto(EntityView, entites);
    });
  }
}

// ['["C","13426"]'];
