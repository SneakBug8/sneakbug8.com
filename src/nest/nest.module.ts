import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import NestPageService from "./nestpage.service";
import NestController from "./nest.controller";

@Module({
  imports: [CoreModule],
  controllers: [NestController],
  providers: [NestPageService],
})
export class NestModule {}
