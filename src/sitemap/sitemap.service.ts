import { Injectable } from "@nestjs/common";
import sm = require("sitemap");
import CmsService from "src/core/services/cms.service";

@Injectable()
export default class SitemapService
{
    public sitemap: Sitemap | undefined = undefined;
    constructor(private readonly cmsService: CmsService)
    {
        // Creates a sitemap object given the input configuration with URLs
        this.sitemap = sm.createSitemap({});
        this.createSitemap();
    }

    async createSitemap()
    {
        const PagesCollection = process.env.PagesCollection || "Pages";
        const PostsCollection = process.env.PostsCollection || "Posts";
        const pages = await this.cmsService.collections.get(PagesCollection);
        for (const page of pages) {
            console.log(page);
        }

        const posts = await this.cmsService.collections.get(PostsCollection);
        for (const post of posts) {
            console.log(post);
        }
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
