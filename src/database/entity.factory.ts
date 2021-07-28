import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export interface EntityFactory<
  TEntity,
  TSchema extends IdentifiableEntitySchema
> {
  createFromSchema(entitySchema: TSchema): TEntity;
  create(...args: any): TEntity | Promise<TEntity>;
}
