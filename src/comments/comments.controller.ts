import * as express from "express";
import { Post, Param, Controller, Res, Req } from "@nestjs/common";

import CommentsService, { Comment } from "./comments.service";

@Controller()
export default class NestController
{
    constructor(private readonly commentsService: CommentsService) { }
    @Post("comments/post/:url")
    async request(@Req() req: express.Request, @Res() res: express.Response, @Param("url") url: string)
    {
        const comment = {
            author: req.body.author,
            content: req.body.content,
            url
        } as Comment;

        this.commentsService.Post(comment);

        if (req.body.redirect) {
            res.redirect(req.body.redirect);
        }
    }
}
