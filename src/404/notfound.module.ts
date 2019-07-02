import { Module, Global } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import NotFoundService from "./notfound.service";
import NotfoundController from "./notfound.controller";

@Global()
@Module({
  imports: [CoreModule],
  controllers: [NotfoundController],
  providers: [NotFoundService],
  exports: [NotFoundService]
})
export class NotFoundModule {}
