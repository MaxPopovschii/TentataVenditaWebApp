import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BasicController } from 'src/basic.controller';
import { Agenti } from 'src/entities/Agenti.entity';
import { AgentiBasic, AgentiSearchPar, AgentiView } from 'src/dto/Agenti.dto';
import {
  EntityExistsException,
  EntityNotFoundException,
} from 'src/exceptions/EntityNotFoundException';
import { ByID } from 'src/dto/Generic.dto';
import { TecnicoID } from '../../../common/src';

@Controller('agenti')
//@ApiTags('agenti')
export class AgentiController extends BasicController {
  @Get('/list')
  async get() {
    return await this.trx(async (em) => {
      const el = em.getRepository(Agenti).createQueryBuilder().getMany();
      return this.toDto(AgentiView, el);
    });
  }
}
