import { Body, Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BasicController } from 'src/basic.controller';
import {
  MaturazioniFilter as EntityFilter,
  MaturazioniView as EntityView,
} from '../dto/Maturazioni.dto';
import { Maturazioni as Entity } from 'src/entities/Maturazione.entity';

@Controller('maturazioni')
//@ApiTags('maturazioni')
export class MaturazioniController extends BasicController {
  @Get('/list')
  @ApiOkResponse()
  async list(@Query() param: EntityFilter) {
    return this.trx(async (em) => {
      const q = em.getRepository(Entity).createQueryBuilder('m');

      if (param.dataStart && param.dataEnd) {
        q.andWhere('m.dataReg BETWEEN :startDate AND :endDate')
          .setParameter('startDate', param.dataStart)
          .setParameter('endDate', param.dataEnd);
      }
      if (param.dataDoc) {
        q.andWhere('m.dataDoc < :dataDoc').setParameter(
          'dataDoc',
          param.dataDoc,
        );
      }

      if (param.codAgeStart && param.codAgeEnd) {
        q.andWhere('m.codAge BETWEEN :startCode AND :endCode')
          .setParameter('startCode', param.codAgeStart)
          .setParameter('endCode', param.codAgeEnd);
      }

      if (param.registrato == 'true') {
        const reg = 1;
        q.andWhere('m.numRow = :reg', {
          reg: reg,
        });
      }
      const entities = await q
        .orderBy('m.codAge', 'DESC')
        .addOrderBy('m.codiceCon', 'DESC')
        .addOrderBy('m.dataSca', 'DESC')
        .addOrderBy('m.dataDoc', 'DESC')
        .getMany();

      return this.toDto(EntityView, entities);
    });
  }
}
