import { Module } from "@nestjs/common";

import CacheService from "./services/cache.service";
import PageService from "./services/page.service";
import PostService from "./services/post.service";

import CmsService from "./services/cms.service";
import FillerService from "./services/filler.service";
import { RedisService } from "./services/redis.service";
import DotenvService from "./services/dotenv.service";

@Module({
  imports: [],
  controllers: [],
  providers: [DotenvService, CacheService, CmsService, FillerService, PageService, PostService,
    RedisService],
  exports: [DotenvService, CacheService, CmsService, FillerService, PageService, PostService,
    RedisService],
})
export class CoreModule { }
