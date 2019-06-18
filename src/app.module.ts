import { Module } from "@nestjs/common";
import { ViewsModule } from "./views/views.module";
import { SitemapModule } from "./sitemap/sitemap.module";

@Module({
  imports: [ViewsModule, SitemapModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
