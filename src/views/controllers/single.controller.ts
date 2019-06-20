import * as express from "express";
import { Get, Param, Controller, Res } from "@nestjs/common";
import PostService from "../../core/services/post.service";
import PageService from "../../core/services/page.service";
import FillerService from "../../core/services/filler.service";

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
            res.render("single", await this.postService.GetRenderData(post));
            return;
        }

        const page = await this.pageService.GetWithUrl(id);

        if (page) {
            res.render("page", await this.pageService.GetRenderData(page));
            return;
        }

        const page404 = await this.pageService.GetWithUrl("404");

        if (page404) {
            res.status(404).render("page", await this.pageService.GetRenderData(page404));
            return;
        }
        else {
            res.status(404).render("404", await this.fillerService.Fill({
                title: "404: Not found",
                description: "No such page on this website"
            }));
            return;
        }
    }
}
