import { Prop } from '@nestjs/mongoose';
import { ObjectID } from 'mongodb';

export abstract class IdentifiableEntitySchema {
  @Prop()
  readonly _id: ObjectID;
}
