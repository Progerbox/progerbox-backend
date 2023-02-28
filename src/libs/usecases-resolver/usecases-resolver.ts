import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';

@Injectable({ scope: Scope.TRANSIENT })
export class UsecasesResolver implements OnModuleInit {
  private readonly usecasesMap: Map<any, any> = new Map();

  constructor(private readonly discoveryService: DiscoveryService, private readonly reflector: Reflector) {}

  public onModuleInit(): any {
    const allProviders = this.discoveryService.getProviders();
    allProviders.forEach((provider) => {
      const { instance } = provider;
      if (!instance?.constructor) return;
      const isUsecase = this.reflector.get('isUsecase', instance.constructor);

      if (isUsecase) {
        this.usecasesMap.set(instance.constructor, instance.constructor);
      }
    });
  }

  public get<T>(usecase: any): T {
    return this.usecasesMap.get(usecase);
  }
}
