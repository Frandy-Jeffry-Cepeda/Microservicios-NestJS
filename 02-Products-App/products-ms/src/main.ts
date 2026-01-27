import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(  
    new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true, 
    }) 
  );

  app.setGlobalPrefix('api');

  await app.listen(envs.port);
  
  Logger.log('Products Microservice is running in port ' + (process.env.PORT ?? 3000));
}
bootstrap();
