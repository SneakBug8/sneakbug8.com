import { Injectable } from "@nestjs/common";
import CmsService from "../core/services/cms.service";

import marked = require("marked");
import FillerService from "../core/services/filler.service";
import { Page } from "../core/services/page.service";
marked.setOptions({
    gfm: true,
    langPrefix: "",
    smartypants: true
});

@Injectable()
export default class NestPageService
{
    private PagesCollection = "nestjsdocs";

    public constructor(private readonly cmsService: CmsService, private readonly fillerService: FillerService)
    {
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
}