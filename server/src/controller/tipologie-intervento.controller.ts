import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TipiInterventi as Entity } from '../entities/TipiInterventi.entity';
import {
  SearchTipologieInterventoQueryInterface,
  TipologieInterventoBasic,
  TipologieInterventoCreate,
  TipologieInterventoEdit as EntityEdit,
  TipologieInterventoLookup,
  TipologieInterventoView as EntityView,
} from '../dto/TipologieIntervento.dto';
import { BasicController } from '../basic.controller';
import { ByID } from '../dto/Generic.dto';
import {
  EntityExistsException,
  EntityNotFoundException,
} from 'src/exceptions/EntityNotFoundException';
import { TipoologiaInterventoID } from '../../../common/src/index';
import { ApiTags } from '@nestjs/swagger';

@Controller('tipologie-intervento')
//@ApiTags('tipologie-intervento')
export class TipologieInterventoController extends BasicController {
  @Get('/list')
  async list() {
    return this.trx(async (em) => {
      const list = await em
        .getRepository(Entity)
        .createQueryBuilder('ti')
        .leftJoinAndSelect('ti.famArti', 'famArti')
        .orderBy('ti.tipoAttrezzatura', 'ASC')
        .addOrderBy('ti.tipoIntervento', 'ASC')
        .getMany();
      return this.toDto(EntityView, list);
    });
  }

  @Get('/getForEdit')
  async getForEdit(@Query() param: ByID) {
    return this.trx(async (em) => {
      const { tipoAttrezzatura, tipoIntervento } = TipoologiaInterventoID.parse(
        param.ID,
      );

      const entity = await em
        .getRepository(Entity)
        .createQueryBuilder('ti')
        .where('ti.tipoAttrezzatura = :tipoAttrezzatura', {
          tipoAttrezzatura,
        })
        .andWhere('ti.tipoIntervento = :tipoIntervento', {
          tipoIntervento,
        })
        .getOne();
      if (!entity) throw new EntityNotFoundException();
      return this.toDto(EntityEdit, entity);
    });
  }

  @Post('/create')
  async create(@Body() entity: TipologieInterventoCreate) {
    return await this.trx(async (em) => {
      const exist = await em
        .getRepository(Entity)
        .createQueryBuilder('ti')
        .where('ti.tipoAttrezzatura = :tipoAttrezzatura', {
          tipoAttrezzatura: entity.tipoAttrezzatura,
        })
        .andWhere('ti.tipoIntervento = :tipoIntervento', {
          tipoIntervento: entity.tipoIntervento,
        })
        .getOne();
      if (exist) throw new EntityExistsException();

      const newEntity = em.getRepository(Entity).create(entity);
      await em.save(newEntity);
    });
  }

  @Put('/update')
  async update(@Body() req: EntityEdit) {
    return await this.trx(async (em) => {
      if (!req.tipoAttrezzatura || !req.tipoIntervento)
        throw new Error('id non impostato');
      const { tipoAttrezzatura, tipoIntervento } = TipoologiaInterventoID.parse(
        req.ID,
      );
      const entity = await em
        .getRepository(Entity)
        .createQueryBuilder('ti')
        .where('ti.tipoAttrezzatura= :tipoAttrezzatura', {
          tipoAttrezzatura,
        })
        .andWhere('ti.tipoIntervento= :tipoIntervento', {
          tipoIntervento,
        })
        .setLock('pessimistic_write')
        .getOne();
      if (!entity) throw new EntityNotFoundException();
      Object.assign(entity, req);
      await em.save(entity);
    });
  }
  @Delete('/delete')
  async delete(@Body() req: ByID) {
    return await this.trx(async (em) => {
      const { tipoAttrezzatura, tipoIntervento } = TipoologiaInterventoID.parse(
        req.ID,
      );
      await em
        .createQueryBuilder()
        .delete()
        .from(Entity)
        .where('tipoAttrezzatura= :tipoAttrezzatura', {
          tipoAttrezzatura,
        })
        .andWhere('tipoIntervento= :tipoIntervento', {
          tipoIntervento,
        })
        .execute();
    });
  }

  @Get('/search')
  async search(@Query() param: SearchTipologieInterventoQueryInterface) {
    return await this.trx(async (em) => {
      const elems = await em
        .getRepository(Entity)
        .createQueryBuilder('ti')
        .where(
          'ti.ardesart LIKE :q or ti.tipoAttrezzatura or ti.tipoIntervento LIKE  :q',
          {
            q: `%${param.searchValue}%`,
          },
        )
        .skip(param.skip)
        .limit(param.take)
        .getMany();
      return this.toDto(TipologieInterventoLookup, elems);
    });
  }
  @Get('/get')
  async get(@Query() param: ByID) {
    return await this.trx(async (em) => {
      const { tipoAttrezzatura, tipoIntervento } = TipoologiaInterventoID.parse(
        param.ID,
      );
      const el = await em
        .getRepository(Entity)
        .createQueryBuilder('ti')
        .where('ti.tipoAttrezzatura=:tipoAttrezzatura', {
          tipoAttrezzatura,
        })
        .andWhere('ti.tipoIntervento=:tipoIntervento', {
          tipoIntervento,
        })
        .getOne();
      if (!el) throw new EntityNotFoundException();
      return this.toDto(TipologieInterventoLookup, el);
    });
  }
}
