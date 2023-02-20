import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Config } from './modules/config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<Config>(Config);

  app.setGlobalPrefix('/api');

  const swaggerConfig = new DocumentBuilder().setTitle('Progerbox API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(config.common.port);
}
bootstrap();
