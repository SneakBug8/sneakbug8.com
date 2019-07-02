import { Injectable } from "@nestjs/common";
import CmsService from "../core/services/cms.service";

import marked = require("marked");
import FillerService from "../core/services/filler.service";
import { Post } from "core/services/post.service";
marked.setOptions({
    gfm: true,
    langPrefix: "",
    smartypants: true
});

@Injectable()
export default class SidenotesService
{
    private PagesCollection = "sidenotes";

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
                content: 1
            }
        });

        if (pages.length) {
            const page = pages[0] as Post;
            page.content = marked.parse(page.content);
            return page;
        }
        else {
            return null;
        }
    }

    public async LoadPage(page: number)
    {
        const notes = await this.cmsService.collections.getWithParams(this.PagesCollection, {
            sort: {
                date: -1,
                _created: -1
            },
            fields: {
                title: 1,
                url: 1,
                content: 1
            },
            limit: 100,
            skip: (page - 1) * 100
        }) as Post[];

        if (notes.length) {
            for (const note of notes) {
                note.content = marked.parse(note.content);
            }

            return notes;
        } else {
            return null;
        }
    }

    private async GetTitle(url: string)
    {
        const posts = await this.cmsService.collections.getWithParams(this.PagesCollection, {
            filter: {
                url,
            },
            fields: {
                title: 1,
                url: 1
            }
        });

        if (posts.length) {
            const post = posts[0] as Post;
            return post;
        }
        else {
            return null;
        }
    }

    public async GetRenderData(note: Post, nodeindex: number)
    {
        const previous = await this.GetTitle((nodeindex - 1).toString());
        if (previous) {
            previous.url = "sidenotes/" + (nodeindex - 1).toString();
        }
        const next = await this.GetTitle((nodeindex + 1).toString());
        if (next) {
            next.url = "sidenotes/" + (nodeindex + 1).toString();
        }

        note.customhomepage = {
            link: "/sidenotes",
            text: "Заметки на полях"
        };

        return await this.fillerService.Fill({
            title: note.title,
            post: note,
            previous,
            next
        });
    }
}
