import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { CreateResourceUsecase } from './usecases/create-resource.usecase';
import { UpdateResourceUsecase } from './usecases/update-resource.usecase';
import { GetResourcesQueryDto } from './dto/get-resources-query.dto';
import { GetResourcesUsecase } from './usecases/get-resources.usecase';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly usecasesResolver: UsecasesResolver) {}

  @ApiOperation({ summary: 'Admin only. Create resource' })
  @HttpCode(201)
  @Post()
  public async createResource(@Body() fields: CreateResourceDto): Promise<any> {
    const usecase = this.usecasesResolver.get<CreateResourceUsecase>(CreateResourceUsecase);
    const resource = await usecase.execute(fields);
    return { resource };
  }

  @ApiOperation({ summary: 'Get resources with tags and categories' })
  @Get()
  public async getResources(@Query() query: GetResourcesQueryDto): Promise<any> {
    const usecase = this.usecasesResolver.get<GetResourcesUsecase>(GetResourcesUsecase);
    const result = await usecase.execute(query);
    return { result };
  }

  @ApiOperation({ summary: 'Admin only. Update resource' })
  @Patch('/:id')
  public async updateResource(@Param('id') id: number, @Body() fields: UpdateResourceDto): Promise<any> {
    const usecase = this.usecasesResolver.get<UpdateResourceUsecase>(UpdateResourceUsecase);
    const resource = await usecase.execute(id, fields);
    return { resource };
  }
}
