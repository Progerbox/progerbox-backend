import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Usecase } from '../../../libs/usecases-resolver';

interface CategoryItem {
  id: number;
  name: string;
  type: string;
}

@Usecase()
export class GetCategoriesUsecase implements IUsecase {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  public async execute(): Promise<CategoryItem[]> {
    const categories = await this.categoriesRepository.find();
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      type: category.type,
    }));
  }
}
