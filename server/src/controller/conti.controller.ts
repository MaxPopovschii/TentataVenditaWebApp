import { Controller, Get, Query } from '@nestjs/common';
import { Conti } from '../entities/Conti.entity';
import {
  ContiBasicGet,
  ContiGet,
  ContiGetQueryParams,
  ContiSearchQueryParams,
} from '../dto/Conti.dto';
import { ContoID } from '../../../common/src/index';
import { BasicController } from '../basic.controller';
import { EntityNotFoundException } from '../exceptions/EntityNotFoundException';
import { ApiTags } from '@nestjs/swagger';
import { Brackets } from 'typeorm';

@Controller('conti')
//@ApiTags('conti')
export class ContiController extends BasicController {
  @Get('/search')
  async searchConti(@Query() param: ContiSearchQueryParams) {
    return await this.trx(async (em) => {
      console.log('tipo conto in search', param.antipcon);
      const conti = await em
        .getRepository(Conti)
        .createQueryBuilder('c')
        .where('antipcon=:antipcon', { antipcon: param.antipcon })
        .andWhere(
          new Brackets((q) =>
            q.where('andescri LIKE :q OR ancodice LIKE :q', {
              q: `%${param.searchValue}%`,
            }),
          ),
        )
        .skip(param.skip)
        .limit(param.take)
        .getMany();
      return this.toDto(ContiBasicGet, conti);
    });
  }

  @Get('/get')
  async getConto(@Query() params: ContiGetQueryParams) {
    return await this.trx(async (em) => {
      const { antipcon, ancodice } = ContoID.parse(params.ID);

      const conto = await em
        .getRepository(Conti)
        .createQueryBuilder('c')
        .where('antipcon=:antipcon', { antipcon })
        .andWhere('ancodice=:ancodice', {
          ancodice,
        })
        .leftJoinAndSelect('c.destinazioni', 'd')
        .getOne();
      if (!conto) throw new EntityNotFoundException();
      return this.toDto(ContiGet, conto);
    });
  }
}
