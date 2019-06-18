import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

import * as path from "path";

import layouts = require("handlebars-layouts");
import hbs = require("hbs");

function configHandlebars()
{
  hbs.registerHelper(layouts(hbs.handlebars));

  const templatesPath = process.env.templatesPath || "templates";

  hbs.registerPartials(__dirname + "/../" + templatesPath);
}

async function bootstrap()
{
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const templatesPath = process.env.templatesPath as string;

  app.useStaticAssets(path.join(__dirname, "..", "root"));
  app.useStaticAssets(path.join(__dirname, "..", "static"), {
    prefix: "/static"
  });

  app.setBaseViewsDir(path.join(__dirname, "..", templatesPath));
  app.setViewEngine("hbs");

  await app.listen(1010);
}

configHandlebars();
bootstrap();
