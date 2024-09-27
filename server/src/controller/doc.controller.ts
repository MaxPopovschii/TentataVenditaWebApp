import { Controller, Get, Query } from '@nestjs/common';
import { BasicController } from '../basic.controller';
import { EntityNotFoundException } from '../exceptions/EntityNotFoundException';
import { ByID } from '../dto/Generic.dto';
import { DocMast } from '../entities/DocMast.entity';
import {
  DocBasicLookup,
  DocByContoParams,
  DocLookup,
  DocSearchParams,
} from '../dto/Doc.dto';
import { ContoID } from '../../../common/src/index';
import { DocDett } from 'src/entities/DocDett.entity';
import { DocDettBasicGet } from 'src/dto/DocDett.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('doc')
//@ApiTags('doc')
export class DocController extends BasicController {
  @Get('/search')
  async search(@Query() param: DocSearchParams) {
    return await this.trx(async (em) => {
      const contoID = ContoID.parse(param.idConto);
      let q = em
        .getRepository(DocMast)
        .createQueryBuilder('c')
        .where('c.mvtipcon=:antipcon', { antipcon: contoID.antipcon })
        .andWhere('c.mvcodcon=:ancodice', { ancodice: contoID.ancodice });

      if (param.causali) {
        q = q.andWhere('c.mvtipdoc IN (:...causali)', {
          causali: param.causali,
        });
      }
      const conti = await q
        .andWhere('(c.ID LIKE :q OR c.mvnumdoc LIKE :q)', {
          q: `%${param.searchValue}%`,
        })
        .skip(param.skip)
        .limit(param.take)
        .getMany();
      return this.toDto(DocBasicLookup, conti);
    });
  }

  @Get('/get')
  async get(@Query() params: ByID) {
    return await this.trx(async (em) => {
      const entity = await this.retrieveEntity({
        em,
        ID: params.ID,
        Entity: DocMast,
      });
      if (!entity) throw new EntityNotFoundException();
      return this.toDto(DocLookup, entity);
    });
  }

  @Get('/dettagli-doc')
  async getDettagiDoc(@Query() params: ByID) {
    return await this.trx(async (em) => {
      const entity = await em
        .getRepository(DocDett)
        .createQueryBuilder('dd')
        .leftJoinAndSelect('dd.articolo', 'a')
        .where('dd.mvserial= :ID', { ID: params.ID })
        .andWhere('dd.mvtiprig <> :D', { D: 'D' })
        .getMany();

      if (!entity) throw new EntityNotFoundException();
      return this.toDto(DocDettBasicGet, entity);
    });
  }

  @Get('/doc-by-conto')
  async getDocByConto(@Query() param: DocByContoParams) {
    return await this.trx(async (em) => {
      const contoID = ContoID.parse(param.ID);
      let q = em
        .getRepository(DocMast)
        .createQueryBuilder('c')
        .leftJoinAndSelect('c.conto', 'conto')
        .leftJoinAndSelect('c.tipoDoc', 'td')
        .leftJoinAndSelect('c.destinazione', 'd')
        .where('c.mvtipcon=:antipcon', { antipcon: contoID.antipcon })
        .andWhere('c.mvcodcon=:ancodice', { ancodice: contoID.ancodice });
      if (param.causali) {
        q = q.andWhere('c.mvtipdoc IN (:...causali)', {
          causali: param.causali,
        });
      }
      const doc = await q.getMany();
      return this.toDto(DocBasicLookup, doc);
    });
  }
}
