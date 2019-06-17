import cms from "../api/cms";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class PostService
{
    public constructor()
    {
        this.PostsCollection = process.env.PostsCollection as string;
    }

    public PostsCollection = "Posts";

    public async GetWithUrl(url: string)
    {
        const posts = await cms.collections.getWithParams(this.PostsCollection, {
            filter: {
                url,
            },
            fields: {
                title: 1,
                date: 1,
                content: 1,
                description: 1,
                image: 1
            }
        });

        if (posts.length) {
            return posts[0] as Post;
        }
        else {
            return null;
        }
    }

    public async LoadPage(page: number)
    {
        const posts = await cms.collections.getWithParams(this.PostsCollection, {
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
}

export interface Post {
    title: string;
    url: string;
    content: string;
    date: string;
    hide: boolean;
    description: string | null;
    image: string | null;
}
