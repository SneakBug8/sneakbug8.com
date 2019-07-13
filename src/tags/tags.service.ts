import { Injectable } from "@nestjs/common";
import { CmsService } from "../core/services/cms.service";
import PostService, { Post } from "core/services/post.service";

import * as marked from "marked";

@Injectable()
export default class TagsService
{
    private readonly PostsCollection: string = "Posts";

    public constructor(private readonly cmsService: CmsService, private readonly postService: PostService)
    {
        this.PostsCollection = postService.PostsCollection;
    }

    public async GetWithTag(tag: string)
    {
        const notes = await this.cmsService.collections.getWithParams<Post[]>(this.PostsCollection, {
            filter: {
                tags: tag,
                hide: false
            },
            fields: {
                title: 1,
                url: 1
            }
        });

        if (notes && notes.length) {
            return notes;
        }
        else {
            return null;
        }
    }
}
