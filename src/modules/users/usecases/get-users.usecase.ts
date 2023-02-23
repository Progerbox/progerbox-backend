import { IUsecase } from '../../../shared/usecase/usecase.interface';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usecase } from '../../../libs/usecases-resolver';

@Usecase()
export class GetUsersUsecase implements IUsecase {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async execute(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}
