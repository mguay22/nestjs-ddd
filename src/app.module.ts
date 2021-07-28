import { Module } from '@nestjs/common';
import { CampersController } from './campers/campers.controller';

@Module({
  imports: [],
  controllers: [CampersController],
  providers: [],
})
export class AppModule {}
