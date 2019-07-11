import { Injectable } from "@nestjs/common";
import { CmsService } from "../core/services/cms.service";

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
