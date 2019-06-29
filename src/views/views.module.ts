import { Module, MiddlewareConsumer, NestModule, Post } from "@nestjs/common";

import HomeController from "../views/controllers/home.controller";
import SingleController from "../views/controllers/single.controller";
import { PageController } from "../views/controllers/page.controller";
import { CoreModule } from "../core/core.module";
import { PageMiddleware } from "./middlewares/page.middleware";
import { PostMiddleware } from "./middlewares/post.middleware";

@Module({
  imports: [CoreModule],
  controllers: [HomeController, SingleController, PageController],
  providers: [],
})
export class ViewsModule implements NestModule
{
  configure(consumer: MiddlewareConsumer)
  {
    consumer.apply(PageMiddleware, PostMiddleware).forRoutes("/");
  }
}
