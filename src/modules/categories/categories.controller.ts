import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryUsecase } from './usecases/create-category.usecase';
import { CategoryRo } from './ro/category.ro';
import { CategoriesRo } from './ro/categories.ro';
import { GetCategoriesUsecase } from './usecases/get-categories.usecase';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateTagUsecase } from './usecases/create-tag.usecase';
import { TagRo } from './ro/tag.ro';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly usecasesResolver: UsecasesResolver) {}

  @HttpCode(201)
  @Post()
  public async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryRo> {
    const usecase = this.usecasesResolver.get<CreateCategoryUsecase>(CreateCategoryUsecase);
    const category = await usecase.execute(createCategoryDto);
    return { category };
  }

  @Get()
  public async getCategories(): Promise<CategoriesRo> {
    const usecase = this.usecasesResolver.get<GetCategoriesUsecase>(GetCategoriesUsecase);
    const categories = await usecase.execute();
    return { categories };
  }

  @HttpCode(201)
  @Post('/tags')
  public async createTag(@Body() createTagDto: CreateTagDto): Promise<TagRo> {
    const usecase = this.usecasesResolver.get<CreateTagUsecase>(CreateTagUsecase);
    const tag = await usecase.execute(createTagDto);
    return { tag };
  }
}
