import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCamperRequest } from './dto/request/create-camper-request.dto';
import { UpdateCamperAllergiesRequest } from './dto/request/update-camper-allergies-request.dto';

@Controller('campers')
export class CampersController {
  constructor() {}

  @Get(':id')
  async getCamper(@Param('id') camperId: string): Promise<void> {}

  @Get()
  async getCampers(): Promise<void> {}

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest,
  ): Promise<void> {}

  @Patch(':id')
  async updateCamperAllergies(
    @Param('id') camperId: string,
    @Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest,
  ): Promise<void> {}
}
