import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config({
    path: '.env',
  });

  app.enableCors({
    origin: '*', // Allow requests from your Next.js frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*', // Allow requests from your Next.js frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3120);
}
bootstrap();
