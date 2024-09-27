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
import { ScontiMaturati as Entity } from '../entities/ScontiMaturati.entity';
import {
  ScontiMaturatiView as EntityView,
  ScontiMaturatiEdit as EntityEdit,
} from '../dto/ScontiMaturati.dto';
import { BasicController } from '../basic.controller';
import { ByNumericID } from '../dto/Generic.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('maturati')
//@ApiTags('maturati')
export class ScontiMaturatiController extends BasicController {
  @Get('/list')
  async list() {
    return this.trx(async (em) => {
      const list = await em
        .getRepository(Entity)
        .createQueryBuilder('m')
        .leftJoinAndSelect('m.conto', 'conto')
        .leftJoinAndSelect('m.articolo', 'articolo')
        .orderBy('m.ID', 'ASC')
        .getMany();
      return this.toDto(EntityView, list);
    });
  }

  @Get('/getForEdit')
  async getForEdit(@Query() param: ByNumericID) {
    return this.trx(async (em) => {
      return this.toDto(
        EntityEdit,
        await this.retrieveEntity({ em, ID: param.ID, Entity }),
      );
    });
  }

  @Post('/create')
  async create(@Body() req: EntityEdit) {
    return await this.trx(async (em) => {
      const { ID, ...data } = req;
      const newEntity = em.getRepository(Entity).create();
      Object.assign(newEntity, req);
      await em.save(newEntity);
    });
  }

  @Put('/update')
  async update(@Body() req: EntityEdit) {
    return await this.trx(async (em) => {
      if (!req.ID) throw new Error('id non impostato');
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
  async delete(@Body() req: ByNumericID) {
    return await this.trx(async (em) => {
      await this.deleteEntity({ em, ID: req.ID, Entity });
    });
  }
}
