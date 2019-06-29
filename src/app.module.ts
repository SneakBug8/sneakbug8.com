import { Module } from "@nestjs/common";
import { ViewsModule } from "./views/views.module";
import { SitemapModule } from "./sitemap/sitemap.module";
import { NestModule } from "./nest/nest.module";
import { NotFoundModule } from "./404/404.module";

@Module({
  imports: [SitemapModule, ViewsModule, NestModule, NotFoundModule]
})
export class AppModule {}
