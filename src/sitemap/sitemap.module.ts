import { Module, Global } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import SitemapController from "./sitemap.controller";
import SitemapService from "./sitemap.service";

@Global()
@Module({
  imports: [CoreModule],
  controllers: [SitemapController],
  providers: [SitemapService],
  exports: [SitemapService]
})
export class SitemapModule {}
