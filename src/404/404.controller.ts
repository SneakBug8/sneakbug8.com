import * as express from "express";
import { Get, Param, Controller, Res } from "@nestjs/common";
import PageService from "../core/services/page.service";
import FillerService from "../core/services/filler.service";

@Controller()
export default class NotFoundController
{
    constructor(private readonly pageService: PageService,
        private readonly fillerService: FillerService) { }

    @Get("*")
    async request(@Param("id") id: string, @Res() res: express.Response)
    {
        const page404 = await this.pageService.GetWithUrl("404");

        if (page404) {
            res.status(404).render("page", await this.pageService.GetRenderData(page404));
            return;
        }
        else {
            res.status(404).render("404", await this.fillerService.Fill({
                title: "404: Not found",
                description: "No such page on this website"
            }));
            return;
        }
    }
}
