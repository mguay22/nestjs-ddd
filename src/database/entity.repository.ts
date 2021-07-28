import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';

import { Entity } from './entity';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { MongoRepository } from './mongo.repository';

export abstract class EntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends Entity<TDto>,
  TDto
> extends MongoRepository<TSchema, TEntity, TDto> {
  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({ _id: new ObjectId(id) } as FilterQuery<TSchema>);
  }

  async findOneAndReplaceById(id: string, entity: TEntity): Promise<TEntity> {
    return this.findOneAndReplace(
      { _id: new ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }
}
