import { Module } from "@nestjs/common";
import { ViewsModule } from "./views/views.module";
import { SitemapModule } from "./sitemap/sitemap.module";

@Module({
  imports: [ViewsModule, SitemapModule]
})
export class AppModule {}
