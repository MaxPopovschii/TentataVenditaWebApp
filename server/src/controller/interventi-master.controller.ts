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
import {
  InterventiMast,
  InterventiMast as Entity,
} from '../entities/InterventiMast.entity';
import { InterventiDett as ChildEntity } from '../entities/InterventiDett.entity';
import { ContoID, MatricolaID } from '../../../common/src/index';
import {
  InterventiMastBasicEdit as EntityMastEdit,
  InterventiMasterEdit as EntityEdit,
  InterventiMasterFilter as EntityFilter,
  InterventiMastView as EntityMastView,
} from '../dto/InterventiMaster.dto';
import { plainToInstance } from 'class-transformer';
import {
  ByNumericID,
  GeneratedID,
  GeneratedNumericID,
  GeneratedNumero,
} from '../dto/Generic.dto';
import { BasicController } from '../basic.controller';
import { EntityManager } from 'typeorm';
import { ScontiContrattiMast } from '../entities/ScontiContrattiMast.entity';
import { hasDuplicates } from '../utils';
import { ApiTags } from '@nestjs/swagger';

@Controller('interventi-master')
//@ApiTags('interventi-master')
export class InterventiMasterController extends BasicController {
  @Get('/list')
  async list(@Query() param: EntityFilter) {
    return this.trx(async (em) => {
      const q = em
        .getRepository(Entity)
        .createQueryBuilder('im')
        .leftJoinAndSelect('im.conto', 'c')
        .leftJoinAndSelect('im.articolo', 'articolo');
      if (param.idCliente) {
        const { antipcon, ancodice } = ContoID.parse(param.idCliente);
        q.where('c.antipcon = :antipcon', { antipcon }).andWhere(
          'c.ancodice = :ancodice',
          { ancodice },
        );
      }
      if (param.tipoAttrezzatura)
        q.andWhere('articolo.arcodfam=:tipoAttrezzatura', {
          tipoAttrezzatura: param.tipoAttrezzatura,
        });
      if (param.idArticolo) {
        q.andWhere('im.codiceArticolo = :idArticolo', {
          idArticolo: param.idArticolo,
        });
        if (param.idMatricola) {
          const { amkeysal, amcodice } = MatricolaID.parse(param.idMatricola);
          q.andWhere('im.codiceMatricola = :amcodice', {
            amcodice,
          });
        }
      }
      const entities = await q.orderBy('im.numero', 'DESC').getMany();
      return this.toDto(EntityMastView, entities);
    });
  }

  @Get('/getForEdit')
  async getForEdit(@Query() req: ByNumericID) {
    return this.trx(async (em) => {
      const entity = await this.retrieveEntity({
        em,
        Entity,
        relations: { dettagli: true },
        ID: req.ID,
      });

      return this.toDto(EntityMastEdit, entity);
    });
  }

  private impostaDettagli({
    entity,
    req,
    ultimaRiga,
  }: {
    entity: Entity;
    req: EntityEdit;
    ultimaRiga: number;
  }) {
    entity.dettagli = req.dettagli.map((dettaglio) => {
      if (dettaglio.ID.includes('new_')) {
        const { ID, ...rest } = dettaglio;
        ultimaRiga = ultimaRiga + 1;
        return plainToInstance(ChildEntity, {
          ...rest,
          idIntervento: req.contratto.ID,
          riga: ultimaRiga,
        });
      } else {
        return plainToInstance(ChildEntity, dettaglio);
      }
    });
    if (hasDuplicates(entity.dettagli.map((el) => el.ID))) {
      throw new BadRequestException('Duplicazione non consentita nelle righe');
    }
  }

  private async calcolaUltimaRiga({
    em,
    req,
  }: {
    em: EntityManager;
    req: EntityEdit;
  }) {
    return (
      (
        await em
          .getRepository(ChildEntity)
          .createQueryBuilder('rc')
          .where('rc.idIntervento = :idIntervento', {
            idIntervento: req.contratto.ID,
          })
          .select('MAX(rc.riga)', 'max')
          .setLock('pessimistic_write')
          .getRawOne()
      )?.max ?? 0
    );
  }

  @Post('/create')
  async create(@Body() req: EntityEdit) {
    return this.trx(async (em) => {
      await em.transaction(async (em) => {
        await this.ensureNotExists({ em, ID: req.contratto.ID, Entity });
        const { ID, ...contratto } = req.contratto;

        const entity = em.getRepository(Entity).create();
        Object.assign(entity, contratto);

        this.impostaDettagli({ req, entity, ultimaRiga: 0 });
        return await em.save(entity);
      });
    });
  }

  @Put('/update')
  async update(@Body() req: EntityEdit) {
    return this.trx(async (em) => {
      const entity = await this.retrieveEntityAndLock({
        em,
        ID: req.contratto.ID,
        Entity,
      });
      Object.assign(entity, req.contratto);
      this.impostaDettagli({
        req,
        entity,
        ultimaRiga: await this.calcolaUltimaRiga({ req, em }),
      });
      await em.save(entity);
    });
  }

  @Delete('/delete')
  async delete(@Body() req: ByNumericID) {
    return this.trx(async (em) => {
      await em
        .createQueryBuilder()
        .delete()
        .from(ChildEntity)
        .where('idIntervento = :ID', {
          ID: req.ID,
        })
        .execute();
      return this.deleteEntity({ em, ID: req.ID, Entity });
    });
  }

  private async getLastNumero({
    em,
    lock = true,
  }: {
    em: EntityManager;
    lock?: boolean;
  }) {
    let q = em
      .getRepository(Entity)
      .createQueryBuilder('a')
      .select('MAX(a.numero)', 'max');
    if (lock) q = q.setLock('pessimistic_write');
    const max = (await q.getRawOne()).max;
    return Number(max ?? 0);
  }

  private async getNewNumero({
    em,
    lock = true,
  }: {
    em: EntityManager;
    lock?: boolean;
  }) {
    const lastId = await this.getLastNumero({ em, lock });
    return lastId + 1;
  }

  @Get('/generateNewNumero')
  public async generateNewNumero() {
    const numero = await this.trx((em) =>
      this.getNewNumero({ em, lock: false }),
    );
    return this.toDto(GeneratedNumero, { numero });
  }
}
