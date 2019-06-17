import { Module } from "@nestjs/common";

import CacheService from "./services/cache.service";
import PageService from "./services/page.service";
import PostService from "./services/post.service";
import HomeController from "./controllers/home.controller";
import SingleController from "./controllers/single.controller";
import CmsService from "./services/cms.service";
import DotenvService from "./services/dotenv.service";
import FillerService from "./services/filler.service";
import { RedisService } from "./services/redis.service";

@Module({
  imports: [],
  controllers: [HomeController, SingleController],
  providers: [CacheService, CmsService, DotenvService, FillerService, PageService, PostService,
    RedisService],
})
export class CoreModule {}
