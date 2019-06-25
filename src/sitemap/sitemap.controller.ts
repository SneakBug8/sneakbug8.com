import { Get, Controller, Res } from "@nestjs/common";
import SitemapService from "./sitemap.service";
import { Response } from "express";

@Controller()
export default class SitemapController
{
    constructor(private readonly sitemapService: SitemapService)
    {
    }

    @Get("sitemap.xml")
    private async request(@Res() res: Response)
    {
        res.header("Content-Type", "text/xml").send(this.sitemapService.getXml());
    }
}
