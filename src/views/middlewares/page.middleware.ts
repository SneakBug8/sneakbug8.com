import { Injectable, NestMiddleware, Req, Res } from "@nestjs/common";
import FillerService from "../../core/services/filler.service";
import express = require("express");
import PageService from "../../core/services/page.service";

@Injectable()
export class PageMiddleware implements NestMiddleware
{
    constructor(private readonly pageService: PageService,
        private readonly fillerService: FillerService) { }

    async use(@Req() req: express.Request, @Res() res: express.Response, next: () => void)
    {
        const urlcatch = new RegExp("/(.+)/?").exec(req.url);

        if (!urlcatch) {
            next();
            return;
        }

        const url = urlcatch[1];

        const page = await this.pageService.GetWithUrl(url);

        if (page) {
            res.render("page", await this.pageService.GetRenderData(page));
            return;
        }

        next();
    }
}