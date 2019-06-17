import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import PostService from "../services/post.service";
import FillerService from "../services/filler.service";

@Controller()
export class PageController
{
    constructor(private readonly postService: PostService, private readonly fillerService: FillerService) { }

    @Get("/p/:num")
    async request(@Param("num") num: string, @Res() res: Response)
    {
        if (!new RegExp("[0-9]+").test(num)) {
            return;
        }

        const pagenum = Number.parseInt(num, 10);

        if (pagenum === 1) {
            res.redirect("/");
            return;
        }

        const posts = await this.postService.LoadPage(pagenum);

        if (!posts || !posts.length) {
            res.redirect("/");
            return;
        }

        let nextpage = null;
        let prevpage = null;

        if (posts && posts.length >= 20) {
            nextpage = pagenum + 1;
        }

        if (pagenum > 1) {
            prevpage = pagenum - 1;
        }

        res.render("posts", await this.fillerService.Fill({
            posts,
            nextpage,
            prevpage
        }));
    }
}
