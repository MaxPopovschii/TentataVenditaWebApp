import { Controller, Get, Query } from '@nestjs/common';
import { MatricolaID } from '../../../common/src/index';
import { BasicController } from '../basic.controller';
import { EntityNotFoundException } from '../exceptions/EntityNotFoundException';
import {
  MatricolaBasicGet,
  MatricolaGetQueryParams,
  MatricoleSearchQueryParams,
} from 'src/dto/Matricole.dto';
import { Matricol } from 'src/entities/Matricol.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('matricole')
//@ApiTags('matricole')
export class MatricoleController extends BasicController {
  @Get('/search')
  async searchConti(@Query() param: MatricoleSearchQueryParams) {
    return await this.trx(async (em) => {
      const conti = await em
        .getRepository(Matricol)
        .createQueryBuilder('m')
        .where('m.amcodice LIKE :q', {
          q: `%${param.searchValue}%`,
        })
        .skip(param.skip)
        .limit(param.take)
        .getMany();
      console.log('matricole db:', conti);
      return this.toDto(MatricolaBasicGet, conti);
    });
  }

  @Get('/get')
  async getConto(@Query() params: MatricolaGetQueryParams) {
    return await this.trx(async (em) => {
      const { amkeysal, amcodice } = MatricolaID.parse(params.ID);
      console.log(amkeysal, amcodice);
      const matricola = await em
        .getRepository(Matricol)
        .createQueryBuilder('c')
        .where('amkeysal=:amkeysal', { amkeysal })
        .andWhere('amcodice=:amcodice', {
          amcodice,
        })
        .getOne();
      if (!matricola) throw new EntityNotFoundException();
      return this.toDto(MatricolaBasicGet, matricola);
    });
  }
}
