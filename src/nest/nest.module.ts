import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import NestPageService from "./nestpage.service";
import NestController from "./nest.controller";
import { SitemapModule } from "sitemap/sitemap.module";

@Module({
  imports: [CoreModule, SitemapModule],
  controllers: [NestController],
  providers: [NestPageService],
})
export class NestModule {}
