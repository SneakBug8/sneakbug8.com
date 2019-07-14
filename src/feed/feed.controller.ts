import { Get, Controller, Res } from "@nestjs/common";
import { Response } from "express";
import FeedService from "./feed.service";
import FillerService from "base/filler.service";

@Controller("feeds/")
export default class FeedController
{
    constructor(private readonly feedService: FeedService,
        private readonly fillerService: FillerService)
    {
    }

    @Get("/")
    private async request(@Res() res: Response)
    {
        res.render("page", await this.fillerService.Fill({
            title: "RSS и прочие ленты для читалок",
            page: {
                content: `
                    <ul>
                        <li><a href="/feeds/feed.xml">RSS</a></li>
                        <li><a href="/feeds/atom.xml">Atom</a></li>
                        <li><a href="/feeds/feed.json">JSON</a></li>
                    </ul>
                `
            }
        }));
    }

    @Get("feed.xml")
    private async requestrss(@Res() res: Response)
    {
        res.header("Content-Type", "text/xml").send(this.feedService.GetRss());
    }

    @Get("feed.json")
    private async requestjson(@Res() res: Response)
    {
        res.header("Content-Type", "application/json").send(this.feedService.GetJson());
    }

    @Get("atom.xml")
    private async requestatom(@Res() res: Response)
    {
        res.header("Content-Type", "text/xml").send(this.feedService.GetAtom());
    }
}
