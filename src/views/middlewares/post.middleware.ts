import { Injectable, NestMiddleware, Req, Res } from "@nestjs/common";
import PostService from "../../core/services/post.service";
import express = require("express");
import CommentsService from "comments/comments.service";

@Injectable()
export class PostMiddleware implements NestMiddleware
{
    constructor(private readonly postService: PostService,
        private readonly commentsService: CommentsService) { }

    async use(@Req() req: express.Request, @Res() res: express.Response, next: () => void)
    {
        const urlcatch = new RegExp("\/(.+)\/?").exec(req.url);
        if (!urlcatch) {
            next();
            return;
        }

        const url = urlcatch[1];

        const post = await this.postService.GetWithUrl(url);

        const comments = await this.commentsService.GetWithUrl(url);

        if (post) {
            res.render("single", await this.postService.GetRenderData(post, { comments, url, redirect: req.url }));
            return;
        }

        next();
    }
}