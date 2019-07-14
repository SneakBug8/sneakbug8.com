import { Global, Module } from "@nestjs/common";
import DotenvService from "./dotenv.service";
import { CmsService } from "./cms.service";
import CacheService from "./cache.service";
import FillerService from "./filler.service";
import { RedisService } from "./redis.service";

@Global()
@Module({
    providers: [DotenvService, CmsService, CacheService, FillerService, RedisService],
    exports: [DotenvService, CmsService, FillerService, CacheService]
})
export class BaseModule {}
