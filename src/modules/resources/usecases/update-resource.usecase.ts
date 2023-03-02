import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';
import { OperationExceptions } from '../../exceptions/operation-exceptions';
import { Usecase } from '../../../libs/usecases-resolver';
import { UpdateResourceDto } from '../dto/update-resource.dto';
import { Tag } from '../../categories/entities/tag.entity';

@Usecase()
export class UpdateResourceUsecase implements IUsecase {
  constructor(
    @InjectRepository(Resource)
    private readonly resourcesRepository: Repository<Resource>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  public async execute(id: number, fields: UpdateResourceDto): Promise<Resource> {
    const tagsWhere = (fields.tagsIds ?? []).map((id) => ({ id }));
    const tags = await this.tagsRepository.findBy(tagsWhere);

    const resource = await this.resourcesRepository.findOne({
      relations: {
        tags: true,
      },
      where: { id },
    });

    if (!resource) {
      throw this.operationExceptions.resources.notFound({ id });
    }

    resource.tags = tags;

    await this.resourcesRepository.save({
      ...resource,
      ...fields,
    });

    return resource;
  }
}
