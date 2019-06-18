import { Get, Controller, Res } from "@nestjs/common";
import SitemapService from "./sitemap.service";

@Controller()
export default class SitemapController
{
    constructor(private readonly sitemapService: SitemapService)
    {
    }

    @Get("/sitemap.xml")
    private async request()
    {
        return this.sitemapService.getXml();
    }
}
