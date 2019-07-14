import { Module, Global } from "@nestjs/common";
import { CoreModule } from "core/core.module";
import FeedController from "./feed.controller";
import FeedService from "./feed.service";

@Module({
  controllers: [FeedController],
  providers: [FeedService],
  exports: [FeedService],
})
export class FeedModule { }
