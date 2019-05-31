import * as _ from "lodash";
import cms from "../api/cms";

export default class Post
{
    public static PostsCollection = "Posts";

    public static async GetWithUrl(url: string)
    {
        const posts = await cms.collections.getWithParams(this.PostsCollection, {
            filter: {
                url
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
            return posts[0];
        }
        else {
            return null;
        }
    }

    public static async LoadPage(page: number)
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
            return posts;
        }
        else {
            return null;
        }
    }

    public title: string = "";
    public url: string = "";
    public content: string = "";
    public date: string = "";
    public hide: boolean = false;
    public description: string | null = null;
    public image: string | null = null;
}

Post.PostsCollection = process.env.PostsCollection as string;
