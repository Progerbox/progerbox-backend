import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { DiscoveryModule } from '@nestjs/core';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Tag } from './entities/tag.entity';
import { CreateCategoryUsecase } from './usecases/create-category.usecase';
import { GetCategoriesUsecase } from './usecases/get-categories.usecase';
import { CreateTagUsecase } from './usecases/create-tag.usecase';
import { Resource } from '../resources/entities/resource.entity';

@Module({
  imports: [DiscoveryModule, TypeOrmModule.forFeature([Category, Tag, Resource])],
  providers: [CreateCategoryUsecase, GetCategoriesUsecase, CreateTagUsecase, UsecasesResolver],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
