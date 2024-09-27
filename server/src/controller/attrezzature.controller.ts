import { Controller, Get, Query } from '@nestjs/common';
import { BasicController } from '../basic.controller';
import { EntityNotFoundException } from '../exceptions/EntityNotFoundException';
import { SearchAttrezzatureQueryInterface } from '../dto/Attrezzature.dto';
import { FamArti } from '../entities/FamArti.entity';
import { FamArtiBasic, FamArtiConInterventi } from '../dto/FamArti.dto';
import { ByID } from '../dto/Generic.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('attrezzature')
//@ApiTags('attrezzature')
export class AttrezzatureController extends BasicController {
  @Get('/search')
  async search(@Query() param: SearchAttrezzatureQueryInterface) {
    return await this.trx(async (em) => {
      const elems = await em
        .getRepository(FamArti)
        .createQueryBuilder('a')
        .where('a.fadescri LIKE :q or a.facodice LIKE  :q', {
          q: `%${param.searchValue}%`,
        })
        .skip(param.skip)
        .limit(param.take)
        .getMany();
      return this.toDto(FamArtiBasic, elems);
    });
  }

  @Get('/get')
  async get(@Query() param: ByID) {
    return await this.trx(async (em) => {
      const el = await em
        .getRepository(FamArti)
        .createQueryBuilder('a')
        .andWhere('a.ID=:ID', {
          ID: param.ID,
        })
        .leftJoinAndSelect('a.interventi', 'i')
        .getOne();
      if (!el) throw new EntityNotFoundException();
      return this.toDto(FamArtiConInterventi, el);
    });
  }
}
