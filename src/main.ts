import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Active la validation globale des DTO
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Transforme les objets reçus en instances de classes
    forbidNonWhitelisted: true,  // Lève une erreur si des propriétés non définies sont envoyées
    whitelist: true,  // Ignore les propriétés non définies dans le DTO
  }));

  await app.listen(3000);
}
bootstrap();
