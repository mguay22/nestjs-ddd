import { AggregateRoot } from '@nestjs/cqrs';

export abstract class Entity<TDto> extends AggregateRoot {
  abstract getDto(): TDto;
}
