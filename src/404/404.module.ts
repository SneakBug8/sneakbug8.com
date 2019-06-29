import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import NotFoundController from "./404.controller";

@Module({
  imports: [CoreModule],
  controllers: [NotFoundController],
  providers: [],
})
export class NotFoundModule {}
