import { NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  LeanDocument,
  Model,
  _AllowStringsForIds,
} from 'mongoose';
import { Entity } from './entity';
import { EntitySchemaFactory } from './entity-schema.factory';

import { EntityFactory } from './entity.factory';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export abstract class MongoRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends Entity<TDto>,
  TDto
> {
  constructor(
    protected readonly entityModel: Model<TSchema>,
    protected readonly entityFactory: EntityFactory<TEntity, TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<TSchema, TDto>,
  ) {}

  protected async findOne(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity> {
    const entityDocument = await this.entityModel.findOne(
      entityFilterQuery,
      {},
      { lean: true },
    );

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.entityFactory.createFromSchema(entityDocument);
  }

  protected async find(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity[]> {
    return (
      await this.entityModel.find(entityFilterQuery, {}, { lean: true })
    ).map(entityDocument =>
      this.entityFactory.createFromSchema(entityDocument),
    );
  }

  async create(entity: TEntity): Promise<TEntity> {
    const entityDocument = (
      await new this.entityModel(
        this.entitySchemaFactory.create(entity.getDto()),
      ).save()
    ).toJSON();
    return this.entityFactory.createFromSchema(
      (entityDocument as unknown) as TSchema,
    );
  }

  protected async findOneAndReplace(
    entityFilterQuery: FilterQuery<TSchema>,
    entity: TEntity,
  ): Promise<TEntity> {
    const updatedEntityDocument = await this.entityModel.findOneAndReplace(
      entityFilterQuery,
      (this.entitySchemaFactory.create(
        entity.getDto(),
      ) as unknown) as _AllowStringsForIds<LeanDocument<TSchema>>,
      {
        new: true,
        useFindAndModify: false,
        lean: true,
      },
    );

    if (!updatedEntityDocument) {
      throw new NotFoundException('Unable to find the entity to replace.');
    }

    return this.entityFactory.createFromSchema(updatedEntityDocument);
  }
}
