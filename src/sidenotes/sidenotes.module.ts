import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import SidenotesService from "./sidenotes.service";
import SidenotesController from "./sidenotes.controller";

@Module({
  imports: [CoreModule],
  controllers: [SidenotesController],
  providers: [SidenotesService],
})
export class SidenotesModule {}
