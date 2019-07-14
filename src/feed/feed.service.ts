import { Injectable } from "@nestjs/common";
import { Feed } from "feed";

@Injectable()
export default class FeedService
{
    public readonly Feed: Feed;
    constructor()
    {
        this.Feed = new Feed({
            title: "Pavel Nakonechnyy's Blog",
            description: "Feed with latest posts",
            id: "https://sneakbug8.com",
            link: "https://sneakbug8.com",
            language: "ru", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
            favicon: "https://sneakbug8.com/favicon.ico",
            copyright: "All rights reserved 2019, Pavel Nakonechnyy",
            feedLinks: {
                json: "https://sneakbug8.com/feeds/feed.json",
                atom: "https://sneakbug8.com/feeds/atom.xml"
            },
            author: {
                name: "Pavel Nakonechnyy",
                email: "sneakbug8@pm.me",
                link: "https://sneakbug8.com/about"
            }
        });
    }

    public GetRss() {
        return this.Feed.rss2();
    }

    public GetJson() {
        return this.Feed.json1();
    }

    public GetAtom() {
        return this.Feed.atom1();
    }
}
