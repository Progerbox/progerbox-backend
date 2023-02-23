import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, Reflector } from '@nestjs/core';

@Injectable()
export class UsecasesResolver implements OnModuleInit {
  private readonly usecasesMap: Map<any, any> = new Map();

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  public onModuleInit(): any {
    const allProviders = this.discoveryService.getProviders();
    allProviders.forEach((provider) => {
      const { instance } = provider;
      if (!instance?.constructor) return;
      const isUsecase = this.reflector.get('isUsecase', instance.constructor);

      if (isUsecase) {
        this.usecasesMap.set(instance.constructor, this.moduleRef.get(instance.constructor));
      }
    });
  }

  public get<T>(usecase: any): T {
    return this.usecasesMap.get(usecase);
  }
}
