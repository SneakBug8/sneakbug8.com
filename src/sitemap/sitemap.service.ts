import { Injectable } from "@nestjs/common";
import sm = require("sitemap");
import CmsService from "../core/services/cms.service";

@Injectable()
export default class SitemapService
{
    public sitemap: Sitemap;
    constructor(private readonly cmsService: CmsService)
    {
        // Creates a sitemap object given the input configuration with URLs
        this.sitemap = sm.createSitemap({
            hostname: "https://sneakbug8.com",
            cacheTime: 600000
        });
    }

    getXml()
    {
        if (this.sitemap) {
            return this.sitemap.toString();
        }
        else {
            return "";
        }
    }
}
