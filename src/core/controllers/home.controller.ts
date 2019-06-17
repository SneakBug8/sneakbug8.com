import { Get, Controller } from "@nestjs/common";
import PageService from "../services/page.service";
import PostService from "../services/post.service";

@Controller()
export default class HomeController
{
    constructor(private readonly pageService: PageService, private readonly postService: PostService) {
    }
    @Get()
    private async request(): Promise<string>
    {
        const header = await this.pageService.GetWithUrl("/");
        const posts = await this.postService.LoadPage(1);

        let nextpage = null;

        if (posts && posts.length >= 20) {
            nextpage = "2";
        }

        /*res.render("home", await DataFiller(req, res, {
            header: header.content,
            posts,
            title: header.title,
            description: header.description,
            nextpage,
            hidehomelink: true
        }));*/

        return "";
    }
}
