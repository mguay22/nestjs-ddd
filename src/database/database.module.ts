import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('localhost:27017/ddd')],
})
export class DatabaseModule {}
