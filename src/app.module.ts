import { Module } from "@nestjs/common";
import { ViewsModule } from "./views/views.module";
import { SitemapModule } from "./sitemap/sitemap.module";

// SitemapModule

@Module({
  imports: [ViewsModule, ]
})
export class AppModule {}
