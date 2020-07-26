import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('User');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: process.env.BROKER_URL,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(parseInt(process.env.PORT, 10) || 3002);
  logger.log('Microservice running');
}
bootstrap();
