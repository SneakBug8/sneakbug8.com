import { Injectable } from "@nestjs/common";
import CmsService from "./cms.service";

@Injectable()
export default class PageService
{
    public PagesCollection = "Pages";

    public constructor(private readonly cmsService: CmsService)
    {
        this.PagesCollection = process.env.PagesCollection || "Pages";
    }

    public async GetWithUrl(url: string)
    {
        const posts = await this.cmsService.collections.getWithParams(this.PagesCollection, {
            filter: {
                url
            },
            fields: {
                title: 1,
                content: 1,
                description: 1
            }
        });

        if (posts.length) {
            return posts[0] as Page;
        }
        else {
            return null;
        }
    }
}

export interface Page
{
    title: string;
    url: string;
    content: string;
    description: string | null;
}
