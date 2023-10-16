import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // This allows all origins, you may want to configure it more specifically in production

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Wellness Event Web Application')
    .setDescription('Wellness Event Web Application APIs for HR and vendor')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3088);

  console.log(`Nest App Started on ${process.env.PORT ?? 3088}`);
  console.log(`http://localhost:${process.env.PORT ?? 3088}/api/`);
}
bootstrap();
