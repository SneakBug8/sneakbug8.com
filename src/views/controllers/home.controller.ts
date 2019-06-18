import { Get, Controller, Res } from "@nestjs/common";
import PageService from "../../core/services/page.service";
import PostService from "../../core/services/post.service";
import { Response } from "express";
import FillerService from "../../core/services/filler.service";

@Controller()
export default class HomeController
{
    constructor(private readonly pageService: PageService,
        private readonly postService: PostService,
        private readonly fillerService: FillerService)
    {
    }

    @Get("/")
    private async request(@Res() res: Response)
    {
        const header = await this.pageService.GetWithUrl("/");

        if (!header) {
            res.render("404");
            return;
        }
        const posts = await this.postService.LoadPage(1);

        let nextpage = null;

        if (posts && posts.length >= 20) {
            nextpage = "2";
        }

        res.render("home", await this.fillerService.Fill({
            header: header.content,
            posts,
            title: header.title,
            description: header.description,
            nextpage,
            hidehomelink: true
        }));
    }
}
