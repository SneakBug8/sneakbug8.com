import * as express from "express";
import { Post, Param, Controller, Res, Req } from "@nestjs/common";

import CommentsService, { Comment } from "./comments.service";

@Controller()
export default class CommentsController
{
    constructor(private readonly commentsService: CommentsService) { }
    @Post("comments/post/*")
    async request(@Req() req: express.Request, @Res() res: express.Response)
    {
        const urlcatch = new RegExp("comments\/post\/(.+)\/?").exec(req.url);
        if (!urlcatch) {
            return res.send("404");
        }

        const url = urlcatch[1];

        if (!url || !req.body || !req.body.author || !req.body.content) {
            res.redirect(404, "/404");
        }

        console.log("Comment on " + url);

        const comment = {
            author: req.body.author,
            content: req.body.content,
            url
        } as Comment;

        this.commentsService.Post(comment);

        if (req.body.redirect) {
            if (req.body.redirect.startsWith("/")) {
                return res.status(301).redirect(req.body.redirect);
            }

            return res.status(301).redirect("/" + req.body.redirect);
        }
        else {
            return res.status(301).redirect("/");
        }
    }
}
