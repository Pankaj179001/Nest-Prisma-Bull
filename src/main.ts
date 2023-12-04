import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as coockieParser from 'cookie-parser';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useGlobalPipes(new ValidationPipe({
  //   transform:true,
  //   whitelist:true,
  //   forbidNonWhitelisted:false/*it will restrict user to add extra fields in the bodyand gives the error*/
  // }))

  // for swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.setBaseViewsDir(join(__dirname, 'src', 'views'));

  app.setViewEngine('ejs');

  app.use(coockieParser());
  await app.listen(3399);
}
bootstrap();
