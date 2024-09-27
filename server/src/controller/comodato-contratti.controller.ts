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
import { ContrComodatoMast as Entity } from '../entities/ContrComodatoMast.entity';
import { DateTime } from 'luxon';
import { ContrComodatoDett as ChildEntity } from '../entities/ContrComodatoDett.entity';
import {
  ComodatoContrattiEdit as EntityEdit,
  ComodatoContrattiFilter as EntityFilter,
  ComodatoContrattiMastEdit as EntityMastEdit,
  ComodatoContrattiMastView as EntityMastView,
} from '../dto/ComodatoContratti.dto';
import { plainToInstance } from 'class-transformer';
import {
  ByID,
  ByNumericID,
  GeneratedID,
  GeneratedNumericID,
  GeneratedNumero,
} from '../dto/Generic.dto';
import { BasicController } from '../basic.controller';
import {
  ContoID,
  DestinazioneID,
  MatricolaID,
} from '../../../common/src/index';
import { Brackets, EntityManager } from 'typeorm';
import { groupBy } from 'rxjs';
import { hasDuplicates } from '../utils';
import { ApiTags } from '@nestjs/swagger';

@Controller('comodato-contratti')
//@ApiTags('comodato-contratti')
export class ComodatoContrattiController extends BasicController {
  @Get('/list')
  async list(@Query() param: EntityFilter) {
    return this.trx(async (em) => {
      const q = em
        .getRepository(Entity)
        .createQueryBuilder('cc')
        .leftJoinAndSelect('cc.conto', 'c');
      if (param.idCliente) {
        const tipoClietne = ContoID.parse(param.idCliente).antipcon;
        const codiceCliente = ContoID.parse(param.idCliente).ancodice;
        q.where('cc.clienteTipoConto=:tipoClietne', {
          tipoClietne: tipoClietne,
        }).andWhere('cc.clienteCodice=:codiceCliente', {
          codiceCliente: codiceCliente,
        });
        if (param.idDestinazione) {
          const codiceDestinazione = DestinazioneID.parse(
            param.idDestinazione,
          ).ddcoddes;
          q.andWhere('cc.codiceDestinazione= :codiceDestinazione', {
            codiceDestinazione: codiceDestinazione,
          });
        }
      }
      if (param.codiceArticolo && !param.idMatricola)
        q.innerJoin('cc.dettagli', 'd', 'd.codiceArticolo =:codiceArticolo', {
          codiceArticolo: param.codiceArticolo,
        });
      if (param.idMatricola && param.codiceArticolo)
        q.innerJoin(
          'cc.dettagli',
          'd',
          'd.codiceArticolo =:codiceArticolo and d.codiceMatricola= :codiceMatricola',
          {
            codiceArticolo: param.codiceArticolo,
            codiceMatricola: MatricolaID.parse(param.idMatricola).amcodice,
          },
        );
      if (!param.alsoClosed)
        q.andWhere(
          new Brackets((qb) => {
            qb.where('cc.dataChiusuraContratto > :oggi', {
              oggi: DateTime.local().toFormat('yyyy-MM-dd'),
            }).orWhere('cc.dataChiusuraContratto IS NULL');
          }),
        );

      q.orderBy('cc.numero', 'DESC');
      const entities = await q.getMany();
      return this.toDto(EntityMastView, entities);
    });
  }

  @Get('/getForEdit')
  async getForEdit(@Query() req: ByNumericID) {
    return this.trx(async (em) => {
      const entity = await this.retrieveEntity({
        em,
        Entity,
        ID: req.ID,
        relations: { dettagli: true },
      });
      return this.toDto(EntityMastEdit, entity);
    });
  }

  private impostaDettagli({
    entity,
    req,
  }: {
    entity: Entity;
    req: EntityEdit;
  }) {
    entity.dettagli = req.dettagli.map((dettaglio) => {
      if (dettaglio.ID.includes('new_')) {
        const { ID, ...rest } = dettaglio;
        return plainToInstance(ChildEntity, {
          ...rest,
          idContratto: req.contratto.ID,
        });
      } else {
        return plainToInstance(ChildEntity, {
          ...dettaglio,
          idContratto: req.contratto.ID,
        });
      }
    });
    if (hasDuplicates(entity.dettagli.map((el) => el.ID))) {
      throw new BadRequestException('Duplicazione non consentita nelle righe');
    }
  }

  @Post('/create')
  async create(@Body() req: EntityEdit) {
    return this.trx(async (em) => {
      await em.transaction(async (em) => {
        if (req.contratto.ID)
          throw new BadRequestException(
            "L'ID dei contratti di comodato è autogenerato: non può essere impostato dal chiamante",
          );
        await this.ensureNotExistsNumero({
          em,
          numero: req.contratto.numero,
          Entity,
        });
        const entity = em.getRepository(Entity).create();
        Object.assign(entity, req.contratto);
        this.impostaDettagli({ req, entity });
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
      await this.ensureNotExistsNumero({
        em,
        numero: req.contratto.numero,
        Entity,
        ID: req.contratto.ID,
      });
      Object.assign(entity, req.contratto);
      this.impostaDettagli({
        req,
        entity,
      });
      console.log('Req', req.contratto, req.dettagli);
      console.log(entity);
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
        .where('idContratto = :ID', {
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
