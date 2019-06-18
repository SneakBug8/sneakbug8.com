import { Module } from "@nestjs/common";
import { CoreModule } from "src/core/core.module";
import SitemapController from "./sitemap.controller";
import SitemapService from "./sitemap.service";


@Module({
  imports: [CoreModule],
  controllers: [SitemapController],
  providers: [SitemapService],
})
export class SitemapModule {}
