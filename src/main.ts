import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from "firebase-admin";

require("dotenv").config();

const credencials = JSON.parse(process.env.SB_KEY);

admin.initializeApp({
  credential: admin.credential.cert(credencials),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
