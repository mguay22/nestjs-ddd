import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export interface EntitySchemaFactory<
  TSchema extends IdentifiableEntitySchema,
  TDto
> {
  create(entityDto: TDto): TSchema;
}
