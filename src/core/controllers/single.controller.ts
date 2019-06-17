import * as express from "express";
// import DataFiller from "../filler";

// import marked = require("marked");
import { Get, Param, Controller } from "@nestjs/common";
import PostService from "../services/post.service";

/*marked.setOptions({
    gfm: true,
    langPrefix: "",
    smartypants: true
});*/

@Controller()
export default class SingleController
{
    constructor(private readonly postService: PostService) { }

    @Get(":id")
    async request(@Param("id") id): Promise<string>
    {
        const post = await this.postService.GetWithUrl(id);

        if (post) {
            //post.content = marked.parse(post.content);

            /*res.render("single", await DataFiller(req, res, {
                title: post.title,
                post,
                image: post.image,
                description: post.description || null
            }));*/
            return post.content;
        }
        else {
            // next();
            // render 404
            return "404";
        }
    }
}