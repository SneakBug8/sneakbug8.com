import { Module } from "@nestjs/common";

import CacheService from "./services/cache.service";
import PageService from "./services/page.service";
import PostService from "./services/post.service";

import CmsService from "./services/cms.service";
import DotenvService from "./services/dotenv.service";
import FillerService from "./services/filler.service";
import { RedisService } from "./services/redis.service";

@Module({
  imports: [],
  controllers: [],
  providers: [CacheService, CmsService, DotenvService, FillerService, PageService, PostService,
    RedisService],
  exports: [CacheService, CmsService, DotenvService, FillerService, PageService, PostService,
    RedisService],
})
export class CoreModule { }
