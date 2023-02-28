import { Controller, Get, HttpCode, NotImplementedException, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  @HttpCode(201)
  @Post()
  public async createResource() {
    throw new NotImplementedException();
  }

  @Get()
  public async getResources() {
    throw new NotImplementedException();
  }

  @Patch('/:id')
  public async updateResource() {
    throw new NotImplementedException();
  }
}
