import { Controller, Get, Query } from '@nestjs/common';

import { BasicController } from '../basic.controller';
import { EntityNotFoundException } from '../exceptions/EntityNotFoundException';
import { ByID } from '../dto/Generic.dto';
import { KeyArtView, SearchKeyArtQueryInterface } from 'src/dto/KeyArt.dto';
import { KeyArti } from 'src/entities/KeyArti.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('key-art')
//@ApiTags('key-art')
export class KeyArtController extends BasicController {
  @Get('/search')
  async search(@Query() param: SearchKeyArtQueryInterface) {
    return await this.trx(async (em) => {
      const elems = await em
        .getRepository(KeyArti)
        .createQueryBuilder('ka')
        .where('ka.cadesart LIKE :q or ka.ID LIKE  :q', {
          q: `%${param.searchValue}%`,
        })
        .skip(param.skip)
        .limit(param.take)
        .getMany();
      return this.toDto(KeyArtView, elems);
    });
  }

  @Get('/get')
  async get(@Query() param: ByID) {
    return await this.trx(async (em) => {
      const el = await em
        .getRepository(KeyArti)
        .createQueryBuilder('ka')
        .andWhere('ka.ID=:ID', {
          ID: param.ID,
        })
        .getOne();
      if (!el) throw new EntityNotFoundException();
      return this.toDto(KeyArtView, el);
    });
  }
}
