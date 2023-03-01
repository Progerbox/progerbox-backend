import { Body, Controller, Get, HttpCode, NotImplementedException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { CreateResourceUsecase } from './usecases/create-resource.usecase';
import { UpdateResourceUsecase } from './usecases/update-resource.usecase';
import { GetResourcesQueryDto } from './dto/get-resources-query.dto';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly usecasesResolver: UsecasesResolver) {}

  @HttpCode(201)
  @Post()
  public async createResource(@Body() fields: CreateResourceDto) {
    const usecase = this.usecasesResolver.get<CreateResourceUsecase>(CreateResourceUsecase);
    const resource = await usecase.execute(fields);
    return { resource };
  }

  @Get()
  public async getResources(@Query() query: GetResourcesQueryDto) {
    console.log(query);

    throw new NotImplementedException();
  }

  @Patch('/:id')
  public async updateResource(@Param('id') id: number, @Body() fields: UpdateResourceDto) {
    const usecase = this.usecasesResolver.get<UpdateResourceUsecase>(UpdateResourceUsecase);
    const resource = await usecase.execute(id, fields);
    return { resource };
  }
}
