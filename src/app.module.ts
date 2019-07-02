import { Module } from "@nestjs/common";
import { ViewsModule } from "./views/views.module";
import { SitemapModule } from "./sitemap/sitemap.module";
import { NestModule } from "./nest/nest.module";
import { NotFoundModule } from "./404/notfound.module";
import { SidenotesModule } from "./sidenotes/sidenotes.module";

@Module({
  imports: [SitemapModule, NestModule, SidenotesModule, ViewsModule, NotFoundModule]
})
export class AppModule { }
