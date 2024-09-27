import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BasicController } from 'src/basic.controller';
import { ListaInterventi as Entity } from 'src/entities/ListaInterventi.entity';
import {
  ListaInterventiBasic as EntityView,
  ListaInterventiFilters,
} from 'src/dto/ListaInterventi.dto';

@Controller('lista-interventi')
//@ApiTags('lista-interventi')
export class ListaInterventiController extends BasicController {
  @Get('list')
  async list() {
    return this.trx(async (em) => {
      const list = await em
        .getRepository(Entity)
        .createQueryBuilder()
        .orderBy('numero', 'DESC')
        .getMany();
      return this.toDto(EntityView, list);
    });
  }

  @Get('getByMatricola')
  async getByMatricola(@Query() matricola: ListaInterventiFilters) {
    return this.trx(async (em) => {
      const q = em.getRepository(Entity).createQueryBuilder('l');
      const entites = q
        .where('l.matricola = :matricola', {
          matricola: matricola.matricola,
        })
        .orderBy('l.dataEsecuzione', 'DESC')
        .getMany();
      return this.toDto(EntityView, entites);
    });
  }
}
