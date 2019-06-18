import * as express from "express";
import { Get, Param, Controller, Res } from "@nestjs/common";
import PostService from "../../core/services/post.service";
import PageService from "../../core/services/page.service";
import FillerService from "../../core/services/filler.service";

import marked = require("marked");
marked.setOptions({
    gfm: true,
    langPrefix: "",
    smartypants: true
});


@Controller()
export default class SingleController
{
    constructor(private readonly postService: PostService,
        private readonly pageService: PageService,
        private readonly fillerService: FillerService) { }

    @Get(":id")
    async request(@Param("id") id: string, @Res() res: express.Response)
    {
        const post = await this.postService.GetWithUrl(id);

        if (post) {
            post.content = marked.parse(post.content);

            res.render("single", await this.fillerService.Fill({
                title: post.title,
                post,
                image: post.image,
                description: post.description || null
            }));
            return;
        }

        const page = await this.pageService.GetWithUrl(id);

        if (page) {
            page.content = marked.parse(page.content);

            res.render("page", await this.fillerService.Fill({
                title: page.title,
                page,
                description: page.description || null
            }));
            return;
        }

        res.render("404");
    }
}