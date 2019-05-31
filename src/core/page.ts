import cms from "../api/cms";

export default class Page
{
    public static async GetWithUrl(url: string)
    {
        const posts = await cms.collections.getWithParams("Pages", {
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

    public title: string = "";
    public url: string = "";
    public content: string = "";
    public description: string | null = null;
}
