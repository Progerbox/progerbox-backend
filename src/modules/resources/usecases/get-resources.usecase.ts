import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';
import { Usecase } from '../../../libs/usecases-resolver';
import { GetResourcesQueryDto } from '../dto/get-resources-query.dto';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../categories/entities/tag.entity';

interface ResourceItem {
  id: number;
  url: string;
  tags: {
    name: string;
  }[];
  categories: {
    name: string;
    type: string;
  }[];
}

@Usecase()
export class GetResourcesUsecase implements IUsecase {
  constructor(
    @InjectRepository(Resource)
    private readonly resourcesRepository: Repository<Resource>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  public async execute(query: GetResourcesQueryDto): Promise<ResourceItem[]> {
    const tagsWhereId: FindOptionsWhere<Tag>[] = (query.tags ?? []).map((id) => ({ id }));
    const categoriesWhereId: FindOptionsWhere<Tag>[] = (query.categories ?? []).map((id) => ({ category: { id } }));
    const tagsWhere = [...tagsWhereId, ...categoriesWhereId];

    const resources = await this.resourcesRepository.find({
      relations: ['tags', 'tags.category'],
      where: {
        tags: tagsWhere,
      },
    });

    const result = [];
    for (const resource of resources) {
      const obj: ResourceItem = {
        id: resource.id,
        url: resource.url,
        tags: [],
        categories: [],
      };
      for (const tag of resource.tags) {
        obj.tags.push({
          name: tag.name,
        });
        obj.categories.push({
          name: tag.category.name,
          type: tag.category.type,
        });
      }

      result.push(obj);
    }

    return result;
  }
}
