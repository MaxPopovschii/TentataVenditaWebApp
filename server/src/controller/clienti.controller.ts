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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BasicController } from 'src/basic.controller';
import { ClientiBasic, ClientiView } from 'src/dto/Clienti.dto';
import { ByID } from 'src/dto/Generic.dto';
import { Clienti } from 'src/entities/Clienti.entity';
import {
  EntityExistsException,
  EntityNotFoundException,
} from 'src/exceptions/EntityNotFoundException';
import { ClientoID } from '../../../common/src';
import { json } from 'stream/consumers';

@Controller('clienti')
//@ApiTags('clienti')
export class ClientiController extends BasicController {
  @Get('list')
  @ApiOkResponse({
    type: ClientiView,
    isArray: true,
  })
  async get() {
    return this.trx(async (em) => {
      const ent = em.getRepository(Clienti).createQueryBuilder().getMany();
      return this.toDto(ClientiView, ent);
    });
  }
  @Get('getForEdit')
  async getForEdit(@Query() param: ByID) {
    return this.trx(async (em) => {
      const { tipoConto, codiceConto } = ClientoID.parse(param.ID);
      const entity = await em.getRepository(Clienti).findOne({
        where: {
          codiceConto,
          tipoConto,
        },
      });
      if (!entity) throw new EntityNotFoundException();
      return this.toDto(ClientiView, entity);
    });
  }
  // Create a new Clienti record
  @Post('create')
  async create(@Body() dto: ClientiView) {
    return this.trx(async (em) => {
      const ID = JSON.stringify([dto.tipoConto, dto.codiceConto]);
      // Create a new Clienti entity and assign data from the DTO
      dto.ID = ID;
      const entity = em.getRepository(Clienti).create();
      Object.assign(entity, dto);
      // Save the new entity in the database

      // Return the saved entity as a DTO or confirmation
      return await em.save(entity);
    });
  }

  @Put('update')
  async update(@Body() dto: ClientiView) {
    return this.trx(async (em) => {
      const { tipoConto, codiceConto } = dto;
      // Find the existing entity by tipoConto and codiceConto
      const entity = await em.getRepository(Clienti).findOne({
        where: {
          codiceConto,
          tipoConto,
        },
      });
      if (!entity) throw new EntityNotFoundException();
      Object.assign(entity, dto);
      // Save the updated entity

      // Return the updated entity as a DTO
      await em.save(entity);
    });
  }

  @Delete('delete')
  async delete(@Query() req: ByID) {
    return this.trx(async (em) => {
      const { tipoConto, codiceConto } = ClientoID.parse(req.ID);
      await em
        .createQueryBuilder()
        .delete()
        .from(Clienti)
        .where('codiceConto = :codice', {
          codice: codiceConto,
        })
        .andWhere('tipoConto = :tipo', {
          tipo: tipoConto,
        })
        .execute();
    });
  }
}
