import cms from "../api/cms";

export default class Post
{
    public static async GetWithUrl(url: string)
    {
        const posts = await cms.collections.getWithParams("Posts", {
            filter: {
                url
            },
            fields: {
                title: 1,
                date: 1,
                content: 1
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
        const posts = await cms.collections.getWithParams("Posts", {
            sort: { date: -1 },
            fields: {
                title: 1,
                date: 1,
                url: 1,
                excerpt: 1
            },
            limit: 20,
            skip: (page - 1) * 20
        });

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
}
