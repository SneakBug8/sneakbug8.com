import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import SidenotesService from "./sidenotes.service";
import SidenotesController from "./sidenotes.controller";
import { FeedModule } from "feed/feed.module";
import { SitemapModule } from "sitemap/sitemap.module";

@Module({
  imports: [CoreModule, FeedModule, SitemapModule],
  controllers: [SidenotesController],
  providers: [SidenotesService],
})
export class SidenotesModule { }
