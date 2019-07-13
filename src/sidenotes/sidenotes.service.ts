import { Injectable, Logger } from "@nestjs/common";
import { CmsService } from "../core/services/cms.service";

import marked = require("marked");
import FillerService from "../core/services/filler.service";
import { Page } from "core/services/page.service";
import SitemapService from "../sitemap/sitemap.service";
marked.setOptions({
    gfm: true,
    langPrefix: "",
    smartypants: true
});

@Injectable()
export default class SidenotesService
{
    private NotesCollection = "sidenotes";

    public constructor(private readonly cmsService: CmsService,
        private readonly fillerService: FillerService,
        private readonly sitemapService: SitemapService)
    {
        setTimeout(() => this.AppendToSitemap(), Math.random() * 10000);
    }

    public async GetWithUrl(url: string)
    {
        const notes = await this.cmsService.collections.getWithParams<Note[]>(this.NotesCollection, {
            filter: {
                url
            },
            fields: {
                title: 1,
                content: 1
            }
        });

        if (notes && notes.length) {
            const page = notes[0];
            page.content = marked.parse(page.content);
            return page;
        }
        else {
            return null;
        }
    }

    public async LoadPage(page: number)
    {
        const notes = await this.cmsService.collections.getWithParams(this.NotesCollection, {
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
        }) as Note[];

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
        const notes = await this.cmsService.collections.getWithParams<Note[]>(this.NotesCollection, {
            filter: {
                url,
            },
            fields: {
                title: 1,
                url: 1
            }
        });

        if (notes && notes.length) {
            const post = notes[0] as Note;
            return post;
        }
        else {
            return null;
        }
    }

    public async GetRenderData(note: Note, nodeindex: number)
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

    async AppendToSitemap() {
        const notes = await this.cmsService.collections.getWithParams<Note[]>(this.NotesCollection, {
            limit: 1000,
            sort: {
                _modified: -1
            },
            fields: {
                url: 1
            }
        });

        if (!notes) {
            return;
        }

        for (const note of notes) {
            this.sitemapService.sitemap.add({
                url: "/sidenotes/" + note.url,
                changefreq: "weekly",
                priority: 0.3
            });
        }

        Logger.log("Added " + notes.length + " notes to sitemap");
    }
}

interface Note extends Page {

}
