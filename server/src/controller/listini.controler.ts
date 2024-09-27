import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BasicController } from 'src/basic.controller';
import {
  ListiniFilters as Filters,
  ListiniBasic as EntityView,
} from 'src/dto/Listini.dto';
import { Listini as Entity } from 'src/entities/Listini.entity';

@Controller('listini')
//@ApiTags('listini')
export class ListiniController extends BasicController {
  @Get('view')
  async list(@Query() param: Filters) {
    return this.trx(async (em) => {
      const q = em.getRepository(Entity).createQueryBuilder();
      const entities = param.codice_listino
        ? q
            .where('Codice_Listino = :codice', {
              codice: param.codice_listino,
            })
            .getMany()
        : q.getMany();
      return this.toDto(EntityView, entities);
    });
  }
}
