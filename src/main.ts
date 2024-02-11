import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactory create nest application with AppModule(this is root module of application)
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
