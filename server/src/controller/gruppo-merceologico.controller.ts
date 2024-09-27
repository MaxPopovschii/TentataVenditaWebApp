import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { BasicController } from '../basic.controller';
import {
  GetGruppoMerceologicoQueryInterface,
  GrupmercView,
  SearchGruppoMerceologicoQueryInterface,
} from '../dto/Grupmerc.dto';
import { Grumerc } from '../entities/Grumerc.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('gruppo-merceologico')
//@ApiTags('gruppo-merceologico')
export class GruppoMerceologicoController extends BasicController {
  @Get('/search')
  async search(@Query() param: SearchGruppoMerceologicoQueryInterface) {
    return await this.trx(async (em) => {
      const elems = await em
        .getRepository(Grumerc)
        .createQueryBuilder('a')
        .where('a.gmdescri LIKE :q or a.ID LIKE  :q', {
          q: `%${param.searchValue}%`,
        })
        .skip(param.skip)
        .limit(param.take)
        .getMany();
      return this.toDto(GrupmercView, elems);
    });
  }

  @Get('/get')
  async get(@Query() param: GetGruppoMerceologicoQueryInterface) {
    return await this.trx(async (em) => {
      const el = await this.retrieveEntity({
        em,
        ID: param.ID,
        Entity: Grumerc,
      });
      return this.toDto(GrupmercView, el);
    });
  }
}
