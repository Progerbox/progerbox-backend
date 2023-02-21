import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Config } from './modules/config/config';
import { AllExceptionFilter } from './modules/exceptions/common/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { formatValidationException } from './modules/exceptions/common/format-validation-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<Config>(Config);

  app.setGlobalPrefix('/api');

  const swaggerConfig = new DocumentBuilder().setTitle('Progerbox API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: formatValidationException,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(config.common.port);
}
bootstrap();
