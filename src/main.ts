import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('APP_PORT', 3000);
  app
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    })
    .setGlobalPrefix('api');

  // configuration for swagger, we can set different values
  const config = new DocumentBuilder()
    .setTitle('Stock Portfolio')
    .setDescription('API collection to manage portfolio')
    .setVersion('1.0')
    .addTag('Stock')
    .addTag('Trade')
    .addTag('Portfolio')
    .addServer(`http://localhost:${PORT}`, 'Development')
    .setContact(
      'Subhadip Dasgupta',
      'https://github.com/subhafx',
      'dasguptafx@gmail.com',
    )
    .build();

  // tells the swagger module to create the document with the config options we just built up
  const document = SwaggerModule.createDocument(app, config);
  // sets the route for the docs, adds it to the our app and passes in the documentation
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT);
}

bootstrap();
