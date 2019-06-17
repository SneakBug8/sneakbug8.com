import { NestFactory } from "@nestjs/core";
import { CoreModule } from "./core/core.module";

import * as dotenv from "dotenv";
dotenv.config();

console.log(process.env);

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  await app.listen(3000);
}

bootstrap();