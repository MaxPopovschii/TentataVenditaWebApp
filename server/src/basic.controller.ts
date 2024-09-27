/* eslint-disable prettier/prettier */
import { Inject, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityTarget, ObjectLiteral } from 'typeorm';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { plainToInstance } from 'class-transformer';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import {
  EntityExistsException,
  EntityNotFoundException,
} from './exceptions/EntityNotFoundException';

export abstract class BasicController {
  @Inject()
  private readonly entityManager: EntityManager;

  protected async trx<T>(fn: (em: EntityManager) => Promise<T>) {
    return this.entityManager.transaction(fn);
  }

  protected toDto<T, V>(cls: ClassConstructor<T>, plain: V[]): T[];
  protected toDto<T, V>(cls: ClassConstructor<T>, plain: V): T;
  protected toDto<T, V>(cls: ClassConstructor<T>, plain: V | V[]) {
    return plainToInstance(cls, plain, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }

  protected async retrieveEntity<T extends ObjectLiteral>({
    em,
    ID,
    Entity,
    relations,
  }: {
    em: EntityManager;
    ID: string | number;
    Entity: EntityTarget<T>;
    relations?: FindOptionsRelations<T>;
  }) {
    const entity = await em
      .getRepository(Entity)
      .findOne({ where: { ID } as any, relations });
    if (!entity) throw new NotFoundException('Entità non esistente');
    return entity;
  }

  protected async retrieveEntityAndLock<T extends ObjectLiteral>({
    em,
    ID,
    Entity,
  }: {
    em: EntityManager;
    ID: string | number;
    Entity: EntityTarget<T>;
  }) {
    const entity = await em
      .getRepository(Entity)
      .createQueryBuilder('cs')
      .where('cs.ID = :ID', {
        ID,
      })
      .setLock('pessimistic_write')
      .getOne();
    if (!entity) throw new EntityNotFoundException();
    return entity;
  }

  protected async deleteEntity<T extends ObjectLiteral>({
    em,
    ID,
    Entity,
  }: {
    em: EntityManager;
    ID: string | number;
    Entity: EntityTarget<T>;
  }) {
    return await em
      .createQueryBuilder()
      .delete()
      .from(Entity)
      .where('ID = :ID', {
        ID,
      })
      .execute();
  }

  protected async ensureNotExists<T extends ObjectLiteral>({
    em,
    ID,
    Entity,
  }: {
    em: EntityManager;
    ID: string | number;
    Entity: EntityTarget<T>;
  }) {
    const entity = await em
      .getRepository(Entity)
      .createQueryBuilder('cs')
      .where('cs.ID = :ID', {
        ID,
      })
      .setLock('pessimistic_write')
      .getOne();
    if (entity) throw new EntityExistsException();
  }

  protected async ensureNotExistsNumero<T extends ObjectLiteral>({
    em,
    numero,
    Entity,
    ID,
  }: {
    em: EntityManager;
    numero: string | number;
    Entity: EntityTarget<T>;
    ID?: number | string | null;
  }) {
    let q = em
      .getRepository(Entity)
      .createQueryBuilder('cs')
      .where('cs.numero = :numero', {
        numero,
      });
    if (ID) q = q.andWhere('cs.ID<>:ID', { ID });
    const entity = await q.setLock('pessimistic_write').getOne();
    if (entity) throw new EntityExistsException();
  }
}
