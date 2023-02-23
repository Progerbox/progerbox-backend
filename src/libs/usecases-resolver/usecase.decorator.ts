import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';
import { InjectableOptions } from '@nestjs/common/decorators/core/injectable.decorator';

export const Usecase = (injectableOptions?: InjectableOptions) => {
  return applyDecorators(Injectable(injectableOptions), SetMetadata('isUsecase', true));
};
