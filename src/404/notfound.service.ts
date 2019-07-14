import { Injectable } from "@nestjs/common";

import marked = require("marked");
import FillerService from "../base/filler.service";
import PageService, { Page } from "../core/services/page.service";
import * as express from "express";

marked.setOptions({
    gfm: true,
    langPrefix: "",
    smartypants: true
});

@Injectable()
export default class NotFoundService
{
    public constructor(private readonly pageService: PageService, private readonly fillerService: FillerService)
    {
    }

    public async Send404(res: express.Response)
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