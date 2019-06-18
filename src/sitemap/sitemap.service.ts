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
        this.createSitemap();
    }

    async createSitemap()
    {
        const PagesCollection = process.env.PagesCollection || "Pages";
        const PostsCollection = process.env.PostsCollection || "Posts";
        const pages = await this.cmsService.collections.get(PagesCollection);
        for (const page of pages) {
            this.sitemap.add({
                url: page.url,
                changefreq: "daily",
                priority: 0.7
            });
        }

        const posts = await this.cmsService.collections.getWithParams(PostsCollection, {
            limit: 100,
            sort: {
                date: -1
            }
        });
        for (const post of posts) {
            this.sitemap.add({
                url: post.url,
                changefreq: "weekly",
                priority: 0.3
            });
        }

        console.log("Loaded " + (posts.length + pages.length) + " pages into sitemap.xml");
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
