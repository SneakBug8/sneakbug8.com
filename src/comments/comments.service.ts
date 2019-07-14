import { Injectable } from "@nestjs/common";
import { CmsService } from "../base/cms.service";

@Injectable()
export default class CommentsService
{
    private CommentsCollection = "comments";

    public constructor(private readonly cmsService: CmsService)
    {
    }

    public async GetWithUrl(url: string)
    {
        const comments = await this.cmsService.collections.getWithParams<Comment[]>(this.CommentsCollection, {
            filter: {
                url
            },
            fields: {
                author: 1,
                content: 1
            },
            sort: {
                id: -1
            }
        });

        if (comments && comments.length) {
            return comments;
        }
        else {
            return null;
        }
    }

    public async Post(comment: Comment)
    {
        if (!comment || !comment.author || !comment.content || !comment.url ||
            comment.content.length > 144 ||
            comment.author.length > 60) {
            return;
        }

        if (!comment.id) {
            comment.id = Date.now().toString() + Math.round(Math.random() * 10);
        }

        this.cmsService.collections.save(this.CommentsCollection, [comment]);
    }
}

export interface Comment
{
    id: string;
    author: string;
    url: string;
    content: string;
}
