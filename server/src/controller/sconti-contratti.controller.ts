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
  ScontiContrattiMast,
  ScontiContrattiMast as Entity,
} from '../entities/ScontiContrattiMast.entity';
import { DateTime } from 'luxon';
import {
  ScontiContrattiDett as ChildEntity,
  ScontiContrattiDett,
} from '../entities/ScontiContrattiDett.entity';
import {
  ScontiContrattiDettView,
  ScontiContrattiEdit as EntityEdit,
  ScontiContrattiFilter as EntityFilter,
  ScontiContrattiMastBasicLookup,
  ScontiContrattiMastEdit as EntityMastEdit,
  ScontiContrattiMastView as EntityMastView,
  SearchContrattiByConto,
  SerchDettagliById,
} from '../dto/ScontiContratti.dto';
import { plainToInstance } from 'class-transformer';
import { ByID, GeneratedID } from '../dto/Generic.dto';
import { BasicController } from '../basic.controller';
import { Brackets, EntityManager } from 'typeorm';
import { ContoID } from '../../../common/src/index';
import { hasDuplicates } from '../utils';
import { ApiTags } from '@nestjs/swagger';

@Controller('sconti-contratti')
//@ApiTags('sconti-contratti')
export class ScontiContrattiController extends BasicController {
  @Get('/list')
  async list(@Query() param: EntityFilter) {
    return this.trx(async (em) => {
      const q = em
        .getRepository(Entity)
        .createQueryBuilder('csm')
        .leftJoinAndSelect('csm.conto', 'c');
      if (param.codiceModello)
        q.where('csm.codiceModello=:codiceModello', {
          codiceModello: param.codiceModello,
        });
      if (!param.alsoClosed)
        q.andWhere(
          new Brackets((qb) => {
            qb.where('csm.dataChiusura > :oggi', {
              oggi: DateTime.local().toFormat('yyyy-MM-dd'),
            }).orWhere('csm.dataChiusura IS NULL');
          }),
        );
      q.orderBy('csm.ID', 'DESC');
      const entities = await q.getMany();
      return this.toDto(EntityMastView, entities);
    });
  }

  @Get('/generateNewId')
  public async generateNewId() {
    const ID = await this.trx((em) => this.getNewId({ em, lock: false }));
    return this.toDto(GeneratedID, { ID });
  }

  private async getLastId({
    em,
    lock = true,
  }: {
    em: EntityManager;
    lock?: boolean;
  }) {
    let q = em
      .getRepository(ScontiContrattiMast)
      .createQueryBuilder('a')
      .select('MAX(a.ID)', 'max');
    if (lock) q = q.setLock('pessimistic_write');
    const max = (await q.getRawOne()).max;
    return String(max);
  }

  private async getNewId({
    em,
    lock = true,
  }: {
    em: EntityManager;
    lock?: boolean;
  }) {
    const lastId = await this.getLastId({ em, lock });
    const parts = lastId.split('/');
    if (parts.length !== 2) {
      return null;
    }
    if (parts[0].length !== 2) parts.reverse();
    if (parts[0].length !== 2 && parts[1].length === 5) return null;
    const part0 = DateTime.now().toFormat('yy');
    if (parts[0] !== part0) {
      return `${part0}/00001`;
    } else {
      return (
        `${part0}/` + (parseInt(parts[1], 10) + 1).toString().padStart(5, '0')
      );
    }
  }

  @Get('/getForEdit')
  async getForEdit(@Query() req: ByID) {
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
          nrContratto: req.contratto.ID,
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
          .where('rc.nrContratto = :nrContratto', {
            nrContratto: req.contratto.ID,
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
        const entity = em.getRepository(Entity).create();
        Object.assign(entity, req.contratto);
        this.impostaDettagli({ req, entity, ultimaRiga: 0 });
        await em.save(entity);
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
  async delete(@Body() req: ByID) {
    return this.trx(async (em) => {
      await em
        .createQueryBuilder()
        .delete()
        .from(ChildEntity)
        .where('nrContratto = :ID', {
          ID: req.ID,
        })
        .execute();
      return this.deleteEntity({ em, ID: req.ID, Entity });
    });
  }
  @Get('contratti-by-conto')
  async GetSearchContrattiByConto(@Query() param: SearchContrattiByConto) {
    return this.trx(async (em) => {
      if (!param.ID) return;
      const { antipcon, ancodice } = ContoID.parse(param.ID);
      const q = em
        .getRepository(Entity)
        .createQueryBuilder('cs')
        .where('cs.clienteTipoConto = :clienteTipoConto', {
          clienteTipoConto: antipcon,
        })
        .andWhere('cs.clienteCodice = :clienteCodice', {
          clienteCodice: ancodice,
        });

      const entities = await q.getMany();
      return entities.map((entity) =>
        this.toDto(ScontiContrattiMastBasicLookup, entity),
      );
    });
  }
  @Get('righe-contratto')
  async getRigheContratto(@Query() param: SerchDettagliById) {
    return this.trx(async (em) => {
      if (!param.ID) return;
      const q = em
        .getRepository(ScontiContrattiDett)
        .createQueryBuilder('csd')
        .leftJoinAndSelect('csd.articolo', 'a')
        .where('csd.nrContratto = :ID', {
          ID: param.ID,
        });

      const entities = await q.getMany();
      return entities.map((entity) =>
        this.toDto(ScontiContrattiDettView, entity),
      );
    });
  }
}
