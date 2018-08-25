import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {readFileSync} from 'fs';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const options = new DocumentBuilder()
    .setTitle('长顺产销对接系统后端接口')
    .setVersion(readFileSync('.git/refs/heads/master').toString().slice(0,7))
    .addBearerAuth('Authorization','header')
    .setSchemes(process.env['NODE_ENV']==='production' ? "https" :"http")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
