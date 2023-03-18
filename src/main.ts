import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 5000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5000',
      'http://188.225.87.70:3000',
      'http://188.225.87.70:5000',
    ],
    credentials: true,
  });

  //app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`server started on ${PORT}`));
}
bootstrap();
