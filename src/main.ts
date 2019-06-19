import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

import * as path from "path";

import layouts = require("handlebars-layouts");
import hbs = require("hbs");

import * as dotenv from "dotenv";

function sleep(ms: number)
{
  return new Promise((resolve) =>
  {
    setTimeout(resolve, ms);
  });
}

const config = dotenv.config().parsed as any;

function configureHandlebars()
{
  hbs.registerHelper(layouts(hbs.handlebars));

  const templatesPath = config.templatesPath || "templates";

  hbs.registerPartials(__dirname + "/../" + templatesPath);
}

async function bootstrap()
{
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const templatesPath = config.templatesPath || "templates";

  app.useStaticAssets(path.join(__dirname, "..", "root"));
  app.useStaticAssets(path.join(__dirname, "..", "static"), {
    prefix: "/static"
  });

  app.setBaseViewsDir(path.join(__dirname, "..", templatesPath));
  app.setViewEngine("hbs");

  await app.listen(config.port);
}

configureHandlebars();
bootstrap();
