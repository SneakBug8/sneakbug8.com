import { Module } from "@nestjs/common";

import PageService from "./services/page.service";
import PostService from "./services/post.service";

import PreloaderService from "./services/preloader.service";
import RequestService from "./services/request.service";
import { BaseModule } from "base/base.module";
import { FeedModule } from "feed/feed.module";
import { SitemapModule } from "sitemap/sitemap.module";

@Module({
  imports: [BaseModule, FeedModule, SitemapModule],
  controllers: [],
  providers: [PreloaderService, PageService, PostService, RequestService],
  exports: [PageService, PostService],
})
export class CoreModule { }
