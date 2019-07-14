import { Injectable, Logger } from "@nestjs/common";
import DotenvService from "../../base/dotenv.service";
import { CmsService } from "../../base/cms.service";
import CacheService from "base/cache.service";

@Injectable()
export default class PreloaderService
{

    public constructor(private readonly dotenvService: DotenvService,
        private readonly cmsService: CmsService,
        private readonly cacheService: CacheService)
    {
        this.preload();
    }

    public async preload()
    {
        const FooterSingleton = this.dotenvService.config.FooterSingleton || "footer";
        const footer = await this.cmsService.singletons.get(FooterSingleton);
        await this.cacheService.set("footer", footer);

        Logger.log("Loaded footer into cache");
        Logger.log("Preloading completed");
    }
}
