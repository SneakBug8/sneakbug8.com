import { Injectable } from "@nestjs/common";
import DotenvService from "./dotenv.service";
import CmsService from "./cms.service";
import CacheService from "./cache.service";

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

        console.log("Loaded footer into cache");
        console.log("Preloading completed");
    }
}
