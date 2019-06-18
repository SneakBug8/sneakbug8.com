import { Module } from "@nestjs/common";

import HomeController from "../views/controllers/home.controller";
import SingleController from "../views/controllers/single.controller";
import { PageController } from "../views/controllers/page.controller";
import { CoreModule } from "src/core/core.module";
import TestController from "./controllers/test.controller";

@Module({
  imports: [CoreModule],
  controllers: [HomeController, SingleController, PageController, TestController],
  providers: [],
})
export class ViewsModule {}
