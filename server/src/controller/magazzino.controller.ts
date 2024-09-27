import { Controller, Get, Query } from '@nestjs/common';

import { BasicController } from '../basic.controller';
import { EntityNotFoundException } from '../exceptions/EntityNotFoundException';
import { ByID } from '../dto/Generic.dto';
import { Magazzin } from '../entities/Magazzin.entity';
import {
  MagazzinoView,
  SearchMagazzinoQueryInterface,
} from 'src/dto/Magazziono.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('magazzino')
//@ApiTags('magazzino')
export class MagazzinoController extends BasicController {
  @Get('/search')
  async search(@Query() param: SearchMagazzinoQueryInterface) {
    return await this.trx(async (em) => {
      const elems = await em
        .getRepository(Magazzin)
        .createQueryBuilder('a')
        .where('a.mgdesmag LIKE :q or a.ID LIKE  :q', {
          q: `%${param.searchValue}%`,
        })

        .skip(param.skip)
        .limit(param.take)
        .getMany();
      return this.toDto(MagazzinoView, elems);
    });
  }

  @Get('/get')
  async get(@Query() param: ByID) {
    return await this.trx(async (em) => {
      const el = await em
        .getRepository(Magazzin)
        .createQueryBuilder('a')
        .andWhere('a.ID=:ID', {
          ID: param.ID,
        })
        .getOne();
      if (!el) throw new EntityNotFoundException();
      return this.toDto(MagazzinoView, el);
    });
  }
}
