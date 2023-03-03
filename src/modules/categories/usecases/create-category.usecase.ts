import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Usecase } from '../../../libs/usecases-resolver';

@Usecase()
export class CreateCategoryUsecase implements IUsecase {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  public async execute(fields: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesRepository.create(fields);
    await this.categoriesRepository.insert(category);
    return category;
  }
}
