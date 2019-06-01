import cms from "../api/cms";

export default class Page
{
    public static PagesCollection = "Pages";
    public static async GetWithUrl(url: string)
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

    public title: string = "";
    public url: string = "";
    public content: string = "";
    public description: string | null = null;
}

Page.PagesCollection = process.env.PagesCollection || "Pages";
