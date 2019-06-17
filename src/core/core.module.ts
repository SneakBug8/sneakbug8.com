import { Module } from "@nestjs/common";

import PageService from "./services/page.service";
import PostService from "./services/post.service";
import HomeController from "./controllers/home.controller";
import SingleController from "./controllers/single.controller";

@Module({
  imports: [],
  controllers: [HomeController, SingleController],
  providers: [PageService, PostService],
})
export class CoreModule {}
