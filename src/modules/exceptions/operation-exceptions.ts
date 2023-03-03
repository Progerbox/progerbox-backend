import { Injectable } from '@nestjs/common';
import { OperationException } from './exception-types/operation-exception';

interface UserNotFound {
  id: number;
}

interface ResourceNotFound {
  id: number;
}

@Injectable()
export class OperationExceptions {
  public readonly users = {
    notFound: (info: UserNotFound) => new OperationException('USER_NOT_FOUND', info),
  };

  public readonly resources = {
    notFound: (info: ResourceNotFound) => new OperationException('RESOURCE_NOT_FOUND', info),
  };
}
