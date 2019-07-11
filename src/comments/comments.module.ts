import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import CommentsController from "./comments.controller";
import CommentsService from "./comments.service";

@Module({
  imports: [CoreModule],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
