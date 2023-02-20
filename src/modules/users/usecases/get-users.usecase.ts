import { IUsecase } from '../../../infrastructure/usecase.interface';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetUsersUsecase implements IUsecase {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async execute(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}
