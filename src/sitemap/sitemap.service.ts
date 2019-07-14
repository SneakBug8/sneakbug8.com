import { Injectable } from "@nestjs/common";
import sm = require("sitemap");

@Injectable()
export default class SitemapService
{
    public sitemap: Sitemap;
    constructor()
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
