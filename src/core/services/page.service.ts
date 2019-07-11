import { Injectable } from "@nestjs/common";
import { CmsService, CmsObjectData } from "./cms.service";

import marked = require("marked");
import FillerService from "./filler.service";
import SitemapService from "../../sitemap/sitemap.service";
marked.setOptions({
    gfm: true,
    langPrefix: "",
    smartypants: true
});

@Injectable()
export default class PageService
{
    public PagesCollection = "Pages";

    public constructor(private readonly cmsService: CmsService,
        private readonly fillerService: FillerService,
        private readonly sitemapService: SitemapService)
    {
        this.PagesCollection = process.env.PagesCollection || "Pages";
        setTimeout(() => this.AppendToSitemap(), Math.random() * 10000);
    }

    public async GetWithUrl(url: string)
    {
        const pages = await this.cmsService.collections.getWithParams<Page[]>(this.PagesCollection, {
            filter: {
                url
            },
            fields: {
                title: 1,
                content: 1,
                description: 1
            }
        });

        if (pages) {
            const page = pages[0];
            page.content = marked.parse(page.content);
            return page;
        }
        else {
            return null;
        }
    }

    public async GetRenderData(page: Page)
    {
        return await this.fillerService.Fill({
            title: page.title,
            page,
            description: page.description || null
        });
    }

    async AppendToSitemap()
    {
        const pages = await this.cmsService.collections.getWithParams<Page[]>(this.PagesCollection, {
            sort: {
                _modified: 1
            },
            fields: {
                url: 1
            }
        });

        if (!pages) {
            return;
        }

        for (const page of pages) {
            this.sitemapService.sitemap.add({
                url: page.url,
                changefreq: "daily",
                priority: 0.7
            });
        }

        console.log("Added " + pages.length + " pages to sitemap");
    }
}

export interface Page extends CmsObjectData
{
    title: string;
    url: string;
    content: string;
    description: string | undefined;
    customhomepage: {
        link: string,
        text: string
    } | undefined;
}
