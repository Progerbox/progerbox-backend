import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryUsecase } from './usecases/create-category.usecase';
import { GetCategoriesUsecase } from './usecases/get-categories.usecase';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateTagUsecase } from './usecases/create-tag.usecase';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly usecasesResolver: UsecasesResolver) {}

  @ApiOperation({ summary: 'Admin only. Create category' })
  @HttpCode(201)
  @Post()
  public async createCategory(@Body() fields: CreateCategoryDto): Promise<any> {
    const usecase = this.usecasesResolver.get<CreateCategoryUsecase>(CreateCategoryUsecase);
    const category = await usecase.execute(fields);
    return { category };
  }

  @ApiOperation({ summary: 'Get categories' })
  @Get()
  public async getCategories(): Promise<any> {
    const usecase = this.usecasesResolver.get<GetCategoriesUsecase>(GetCategoriesUsecase);
    const categories = await usecase.execute();
    return { categories };
  }

  @ApiOperation({ summary: 'Admin only. Create tag' })
  @HttpCode(201)
  @Post('/tags')
  public async createTag(@Body() fields: CreateTagDto): Promise<any> {
    const usecase = this.usecasesResolver.get<CreateTagUsecase>(CreateTagUsecase);
    const tag = await usecase.execute(fields);
    return { tag };
  }
}
