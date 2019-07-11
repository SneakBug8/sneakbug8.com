import * as express from "express";
import { Get, Param, Controller, Res, Req } from "@nestjs/common";
import SidenotesService from "./sidenotes.service";
import FillerService from "../core/services/filler.service";
import NotFoundService from "../404/notfound.service";

@Controller()
export default class SidenotesController
{
    constructor(private readonly sidenotesService: SidenotesService,
        private readonly notfoundService: NotFoundService,
        private readonly fillerService: FillerService) { }

    @Get("sidenotes*")
    async request(@Req() req: express.Request, @Res() res: express.Response)
    {
        const urlcatch = new RegExp("sidenotes\/([0-9]+)").exec(req.url);

        if (!urlcatch && new RegExp("sidenotes/?$").test(req.url)) {
            this.listall(res);
            return;
        }
        else if (!urlcatch) {
            this.notfoundService.Send404(res);
            return;
        }

        const url = urlcatch[1];
        const noteindex = Number.parseInt(url, 10);

        const page = await this.sidenotesService.GetWithUrl(url);

        if (page) {
            res.render("sidenote", await this.sidenotesService.GetRenderData(page, noteindex));
            return;
        }

        this.notfoundService.Send404(res);
    }

    async listall(@Res() res: express.Response)
    {
        const notes = await this.sidenotesService.LoadPage(1);

        if (!notes || !notes.length) {
            this.notfoundService.Send404(res);
            return;
        }

        res.render("sidenotes", await this.fillerService.Fill({
            title: "Заметки на полях",
            notes
        }));
    }
}
