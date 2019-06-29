import * as express from "express";
import { Get, Param, Controller, Res, Req } from "@nestjs/common";
import NestPageService from "./nestpage.service";
import PageService from "../core/services/page.service";
import FillerService from "../core/services/filler.service";

@Controller()
export default class NestController
{
    constructor(private readonly nestpageService: NestPageService,
        private readonly pageService: PageService,
        private readonly fillerService: FillerService) { }

    @Get("nestjs-docs/*")
    async request(@Req() req: express.Request, @Res() res: express.Response)
    {
        const urlcatch = new RegExp("nestjs-docs/(.*)").exec(req.url);

        if (!urlcatch) {
            return;
        }

        const url = urlcatch[1];

        const page = await this.nestpageService.GetWithUrl(url);

        if (page) {
            res.render("page", await this.nestpageService.GetRenderData(page));
            return;
        }

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
