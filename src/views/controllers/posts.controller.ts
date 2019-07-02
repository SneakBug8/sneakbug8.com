import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import PostService from "../../core/services/post.service";
import FillerService from "../../core/services/filler.service";
import PageService from "../../core/services/page.service";
import NotFoundService from "../../404/notfound.service";

@Controller()
export class PostsController
{
    constructor(private readonly postService: PostService,
        private readonly pageService: PageService,
        private readonly fillerService: FillerService,
        private readonly notfoundService: NotFoundService) { }

    @Get("/p/:num")
    async request(@Param("num") num: string, @Res() res: Response)
    {
        if (!new RegExp("[0-9]+").test(num)) {
            this.notfoundService.Send404(res);
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

        let nextpage;
        let prevpage;

        if (posts && posts.length >= 20) {
            nextpage = "/p/ " + (pagenum + 1);
        }

        if (pagenum > 1) {
            const prevpagenum = pagenum - 1;
            if (prevpagenum > 1) {
                prevpage = "/p/ " + prevpagenum;
            }
            else {
                prevpage = "/";
            }
        }

        res.render("posts", await this.fillerService.Fill({
            title: "Публикации: страница " + pagenum,
            posts,
            nextpage,
            prevpage,
            pagenum
        }));
    }
}
