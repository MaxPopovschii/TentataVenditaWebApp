import { Controller, Get, Query } from '@nestjs/common';
import { ArtIcol } from '../entities/ArtIcol.entity';

import { ArticoliView, SearchArticoliQueryInterface } from '../dto/ArtIcol.dto';

import { BasicController } from '../basic.controller';
import { EntityNotFoundException } from '../exceptions/EntityNotFoundException';
import { ByID } from '../dto/Generic.dto';
import { KeyArti } from 'src/entities/KeyArti.entity';
import { ApiTags } from '@nestjs/swagger';
import { Matricol } from 'src/entities/Matricol.entity';

@Controller('articoli')
//@ApiTags('articoli')
export class ArticoliController extends BasicController {
  @Get('/search')
  async search(@Query() param: SearchArticoliQueryInterface) {
    return await this.trx(async (em) => {
      const elems = await em
        .getRepository(ArtIcol)
        .createQueryBuilder('a')
        .where('a.ardesart LIKE :q or a.ID LIKE  :q', {
          q: `%${param.searchValue}%`,
        })
        .leftJoinAndSelect('a.matricole', 'matricole')
        .skip(param.skip)
        .take(param.take)
        .getMany();
      console.log(elems);
      const matr = await em
        .getRepository(Matricol)
        .createQueryBuilder('m')
        .where('m.amcodice LIKE :q or m.amkeysal LIKE  :q', {
          q: `%${param.searchValue}%`,
        })
        .leftJoinAndSelect('m.articolo', 'articolo')
        .skip(param.skip)
        .take(param.take)
        .getMany();
      const data = [
        ...elems.map((el) => {
          return { ...el, ID: el.ID, humanReadableID: el.humanReadableID };
        }),
        ...matr.map((el) => {
          return {
            ...el.articolo,
            matricolaId: el.ID,
            humanReadableID: el.articolo.ID + '****' + el.ID,
          };
        }),
      ];
      return this.toDto(ArticoliView, data);
    });
  }

  @Get('/get')
  async get(@Query() param: ByID) {
    return await this.trx(async (em) => {
      const el = await em
        .getRepository(ArtIcol)
        .createQueryBuilder('a')
        .andWhere('a.ID=:ID', {
          ID: param.ID,
        })
        .leftJoinAndSelect('a.matricole', 'matricole')
        .getOne();
      if (!el) throw new EntityNotFoundException();
      return this.toDto(ArticoliView, el);
    });
  }
  @Get('/get-articolo-by-key-art')
  async getByKeyArt(@Query() parma: ByID) {
    return this.trx(async (em) => {
      const articolo = (
        await em
          .getRepository(KeyArti)
          .createQueryBuilder('ka')
          .leftJoinAndSelect('ka.articolo', 'articolo')
          .where('ka.CACODIC2 = :ID', { ID: parma.ID })
          .getOne()
      )?.articolo;
      return this.toDto(ArticoliView, articolo);
    });
  }
}
