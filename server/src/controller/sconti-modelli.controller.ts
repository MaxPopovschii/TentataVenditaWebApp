import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BasicController } from '../basic.controller';
import { ByID } from '../dto/Generic.dto';
import { ScontiModelli as Entity } from '../entities/ScontiModelli.entity';
import {
  ScontiModelliBasicLookup,
  ScontiModelliEdit as EntityEdit,
  ScontiModelliLookup,
  ScontiModelliSearch as EntitySearch,
  ScontiModelliView as EntityView,
} from '../dto/ScontiModelli.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('sconti-modelli')
//@ApiTags('sconti-modelli')
export class ScontiModelliController extends BasicController {
  @Get('/list')
  async list() {
    return await this.trx(async (em) => {
      const list = await em
        .getRepository(Entity)
        .createQueryBuilder('m')
        .orderBy('m.ID', 'ASC')
        .getMany();
      return this.toDto(EntityView, list);
    });
  }

  @Post('/create')
  async create(@Body() entity: EntityEdit) {
    return await this.trx(async (em) => {
      await this.ensureNotExists({
        em,
        Entity,
        ID: entity.ID,
      });
      const newEntity = em.getRepository(Entity).create(entity);
      await em.save(newEntity);
    });
  }

  @Put('/update')
  async update(@Body() req: EntityEdit) {
    return await this.trx(async (em) => {
      const entity = await this.retrieveEntityAndLock({
        em,
        ID: req.ID,
        Entity,
      });
      Object.assign(entity, req);
      await em.save(entity);
    });
  }
  @Delete('/delete')
  async delete(@Body() req: ByID) {
    return await this.trx(async (em) => {
      await this.deleteEntity({ em, ID: req.ID, Entity });
    });
  }

  @Get('/search')
  async search(@Query() param: EntitySearch) {
    return await this.trx(async (em) => {
      const elems = await em
        .getRepository(Entity)
        .createQueryBuilder('c')
        .where('c.descrizione LIKE :q or c.ID LIKE  :q', {
          q: `%${param.searchValue}%`,
        })
        .skip(param.skip)
        .limit(param.take)
        .getMany();
      return this.toDto(ScontiModelliBasicLookup, elems);
    });
  }

  @Get('/get')
  async get(@Query() req: ByID) {
    return await this.trx(async (em) => {
      const elem = await this.retrieveEntityAndLock({ em, ID: req.ID, Entity });
      return this.toDto(ScontiModelliLookup, elem);
    });
  }

  @Get('/getForEdit')
  async getForEdit(@Query() req: ByID) {
    return await this.trx(async (em) => {
      const elem = await this.retrieveEntityAndLock({ em, ID: req.ID, Entity });
      return this.toDto(EntityEdit, elem);
    });
  }
}
