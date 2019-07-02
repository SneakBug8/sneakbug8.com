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
export default class PostService
{
    public constructor(private readonly cmsService: CmsService, private readonly fillerService: FillerService)
    {
        this.PostsCollection = process.env.PostsCollection as string;
    }

    public PostsCollection = "Posts";

    public async GetWithUrl(url: string)
    {
        const posts = await this.cmsService.collections.getWithParams(this.PostsCollection, {
            filter: {
                url,
            },
            fields: {
                title: 1,
                date: 1,
                content: 1,
                description: 1,
                image: 1,
                nextlink: 1,
                prevlink: 1,
                customhomepage: 1
            }
        });

        if (posts.length) {
            const post = posts[0] as Post;
            post.content = marked.parse(post.content);
            return post;
        }
        else {
            return null;
        }
    }

    public async LoadPage(page: number)
    {
        const posts = await this.cmsService.collections.getWithParams(this.PostsCollection, {
            sort: {
                date: -1,
                _created: -1
            },
            fields: {
                title: 1,
                date: 1,
                url: 1
            },
            filter: {
                hide: false
            },
            limit: 20,
            skip: (page - 1) * 20
        }) as Post[];

        if (posts.length) {
            return posts as Post[];
        } else {
            return null;
        }
    }

    private async GetTitle(url: string)
    {
        const posts = await this.cmsService.collections.getWithParams(this.PostsCollection, {
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

    public async GetRenderData(post: Post)
    {
        let previous = null;
        if (post.prevlink) {
            previous = await this.GetTitle(post.prevlink);
            post.prevlink = undefined;
        }
        let next = null;
        if (post.nextlink) {
            next = await this.GetTitle(post.nextlink);
            post.nextlink = undefined;
        }
        return await this.fillerService.Fill({
            title: post.title,
            post,
            description: post.description || null,
            previous,
            next
        });
    }
}

export interface Post
{
    title: string;
    url: string;
    content: string;
    date: string;
    hide: boolean;
    description: string | undefined;
    image: string | undefined;
    prevlink: string | undefined;
    nextlink: string | undefined;
    customhomepage: {
        link: string,
        text: string
    } | undefined;
}
