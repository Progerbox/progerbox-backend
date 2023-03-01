import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Usecase } from '../../../libs/usecases-resolver';

@Usecase()
export class GetCategoriesUsecase implements IUsecase {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  public async execute(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }
}
