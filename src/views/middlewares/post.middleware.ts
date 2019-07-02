import { Injectable, NestMiddleware, Req, Res } from "@nestjs/common";
import PostService from "../../core/services/post.service";
import FillerService from "../../core/services/filler.service";
import express = require("express");

@Injectable()
export class PostMiddleware implements NestMiddleware
{
    constructor(private readonly postService: PostService,
        private readonly fillerService: FillerService) { }

    async use(@Req() req: express.Request, @Res() res: express.Response, next: () => void)
    {
        const urlcatch = new RegExp("/(.+)/?").exec(req.url);
        if (!urlcatch) {
            next();
            return;
        }

        const url = urlcatch[1];

        const post = await this.postService.GetWithUrl(url);

        if (post) {
            res.render("single", await this.postService.GetRenderData(post));
            return;
        }

        next();
    }
}