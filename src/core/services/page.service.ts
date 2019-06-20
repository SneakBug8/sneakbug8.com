import { Injectable } from "@nestjs/common";
import CmsService from "./cms.service";

import marked = require("marked");
import FillerService from "./filler.service";
marked.setOptions({
    gfm: true,
    langPrefix: "",
    smartypants: true
});

@Injectable()
export default class PageService
{
    public PagesCollection = "Pages";

    public constructor(private readonly cmsService: CmsService, private readonly fillerService: FillerService)
    {
        this.PagesCollection = process.env.PagesCollection || "Pages";
    }

    public async GetWithUrl(url: string)
    {
        const pages = await this.cmsService.collections.getWithParams(this.PagesCollection, {
            filter: {
                url
            },
            fields: {
                title: 1,
                content: 1,
                description: 1
            }
        });

        if (pages.length) {
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
        return await this.fillerService.Fill({
            title: page.title,
            page,
            description: page.description || null
        });
    }
}

export interface Page
{
    title: string;
    url: string;
    content: string;
    description: string | null;
}
