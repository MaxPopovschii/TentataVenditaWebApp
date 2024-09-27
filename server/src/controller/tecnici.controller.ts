import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BasicController } from '../basic.controller';
import { Tecnici } from 'src/entities/Tecnici.entity';
import {
  TecniciBasic,
  TecniciGetQueryParams,
  TecniciInputView,
  TecniciSearchQueryParams,
  TecniciView,
} from 'src/dto/Tecnici.dto';
import { ByID } from 'src/dto/Generic.dto';
import {
  EntityExistsException,
  EntityNotFoundException,
} from 'src/exceptions/EntityNotFoundException';
import { TecnicoID } from '../../../common/src';

@Controller('tecnici')
//@ApiTags('tecnici')
export class TecniciController extends BasicController {
  @Get('/search')
  async searchTecnici(@Query() param: TecniciSearchQueryParams) {
    return await this.trx(async (em) => {
      const tecnici = await em
        .getRepository(Tecnici)
        .createQueryBuilder('t')
        .where('descrizione LIKE :q OR codice LIKE :q', {
          q: `%${param.searchValue}%`,
        })
        .skip(param.skip)
        .limit(param.take)
        .getMany();
      console.log('tecnici q:', tecnici);
      return this.toDto(TecniciInputView, tecnici);
    });
  }

  @Get('/get')
  async getTecnico(@Query() param: TecniciGetQueryParams) {
    return await this.trx(async (em) => {
      const codice = param.ID;
      const tecnico = await em
        .getRepository(Tecnici)
        .createQueryBuilder('c')
        .where('codice=:codice', { codice })
        .getOne();
      if (!tecnico) throw new EntityNotFoundException();
      return this.toDto(TecniciInputView, tecnico);
    });
  }

  @Get('list')
  async list() {
    return this.trx(async (em) => {
      const list = await em
        .getRepository(Tecnici)
        .createQueryBuilder()
        .getMany();
      return this.toDto(TecniciView, list);
    });
  }

  @Get('getForEdit')
  async getForEdit(@Query() param: ByID) {
    return await this.trx(async (em) => {
      const { codice } = TecnicoID.parse(param.ID);
      const entity = await em
        .getRepository(Tecnici)
        .createQueryBuilder()
        .where('codice = :cod', {
          cod: codice,
        })
        .getOne();
      if (!entity) throw new EntityNotFoundException();
      return this.toDto(TecniciView, entity);
    });
  }

  @Post('create')
  async create(@Body() body: TecniciView) {
    return await this.trx(async (em) => {
      const ID = JSON.stringify(body.codice);
      body.ID = ID;
      body.humanReadableID = body.codice;
      const entity = em.getRepository(Tecnici).create();
      Object.assign(entity, body);
      await em.save(entity);
    });
  }

  @Put('update')
  async update(@Body() req: TecniciView) {
    return await this.trx(async (em) => {
      const { codice } = req;
      const entity = await em.getRepository(Tecnici).findOne({
        where: {
          codice,
        },
      });
      if (!entity) throw new EntityNotFoundException();
      Object.assign(entity, req);
      await em.save(entity);
    });
  }

  @Delete('delete')
  async delete(@Body() req: ByID) {
    return await this.trx(async (em) => {
      const { codice } = TecnicoID.parse(req.ID);
      await em
        .getRepository(Tecnici)
        .createQueryBuilder()
        .delete()
        .from(Tecnici)
        .where('codice = :cod', {
          cod: codice,
        })
        .execute();
    });
  }
}
