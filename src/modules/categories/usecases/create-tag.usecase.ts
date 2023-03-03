import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto } from '../dto/create-tag.dto';
import { Usecase } from '../../../libs/usecases-resolver';

@Usecase()
export class CreateTagUsecase implements IUsecase {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async execute(fields: CreateTagDto): Promise<Tag> {
    const tag = this.tagsRepository.create(fields);
    await this.tagsRepository.insert(tag);
    return tag;
  }
}
