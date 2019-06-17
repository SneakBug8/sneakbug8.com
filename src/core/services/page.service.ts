import cms from "../api/cms";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class PageService
{
    public PagesCollection = "Pages";

    public constructor()
    {
        this.PagesCollection = process.env.PagesCollection || "Pages";
    }

    public async GetWithUrl(url: string)
    {
        const posts = await cms.collections.getWithParams(this.PagesCollection, {
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
            return posts[0];
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
