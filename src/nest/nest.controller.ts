import * as express from "express";
import { Get, Param, Controller, Res, Req } from "@nestjs/common";
import NestPageService from "./nestpage.service";
import PageService from "../core/services/page.service";
import FillerService from "../base/filler.service";
import NotFoundService from "../404/notfound.service";

@Controller()
export default class NestController
{
    constructor(private readonly nestpageService: NestPageService,
        private readonly pageService: PageService,
        private readonly fillerService: FillerService,
        private readonly notfoundService: NotFoundService) { }

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

        this.notfoundService.Send404(res);
    }
}
