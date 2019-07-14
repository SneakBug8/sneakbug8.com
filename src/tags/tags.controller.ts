import * as express from "express";
import { Get, Controller, Res, Req, Logger } from "@nestjs/common";
import NotFoundService from "../404/notfound.service";
import TagsService from "./tags.service";
import FillerService from "base/filler.service";

@Controller()
export default class TagsController
{
    constructor(private readonly notfoundService: NotFoundService,
        private readonly tagsService: TagsService,
        private readonly fillerService: FillerService) { }

    @Get("tag/*")
    async request(@Req() req: express.Request, @Res() res: express.Response)
    {
        const tagcatch = new RegExp("tag\/([a-zA-Z0-9]+)").exec(req.url);

        if (!tagcatch) {
            this.notfoundService.Send404(res);
            return;
        }

        const tag = tagcatch[1];

        const posts = await this.tagsService.GetWithTag(tag);

        if (posts) {
            return res.render("posts", await this.fillerService.Fill({
                title: "Посты с тегом #" + tag,
                posts
            }));
        }

        this.notfoundService.Send404(res);
    }
}
