import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { Usecase } from '../../../libs/usecases-resolver';
import { Tag } from '../../categories/entities/tag.entity';

@Usecase()
export class CreateResourceUsecase implements IUsecase {
  constructor(
    @InjectRepository(Resource)
    private readonly resourcesRepository: Repository<Resource>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async execute(fields: CreateResourceDto): Promise<Resource> {
    const tagsWhere = (fields.tagsIds ?? []).map((id) => ({ id }));
    const tags = await this.tagsRepository.findBy(tagsWhere);

    const resource = this.resourcesRepository.create({
      ...fields,
      tags,
    });

    await this.resourcesRepository.insert(resource);
    return resource;
  }
}
