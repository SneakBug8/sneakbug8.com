import { Injectable } from "@nestjs/common";
import CmsService from "../core/services/cms.service";

import marked = require("marked");
import FillerService from "../core/services/filler.service";
import { Page } from "../core/services/page.service";
import SitemapService from "../sitemap/sitemap.service";
marked.setOptions({
    gfm: true,
    langPrefix: "",
    smartypants: true
});

@Injectable()
export default class NestPageService
{
    private PagesCollection = "nestjsdocs";

    public constructor(private readonly cmsService: CmsService,
        private readonly fillerService: FillerService,
        private readonly sitemapService: SitemapService)
    {
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

        if (pages && pages.length) {
            const page = pages[0] as Page;
            page.content = marked.parse(page.content);
            return page;
        }
        else {
            return null;
        }
    }

    public async GetRenderData(page: Page)
    {
        page.customhomepage = {
            text: "Главная документации NestJS",
            link: "/nestjs-docs"
        };

        return await this.fillerService.Fill({
            title: page.title,
            page,
            description: page.description || null,
        });
    }

    async AppendToSitemap() {
        const pages = await this.cmsService.collections.getWithParams<Page[]>(this.PagesCollection, {
            limit: 1000,
            sort: {
                _modified: -1
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
                url: "/nestjs-docs/" + page.url,
                changefreq: "monthly",
                priority: 0.1
            });
        }

        console.log("Added " + pages.length + " nestjs-docs to sitemap");
    }
}