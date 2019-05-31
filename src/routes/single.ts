import * as express from "express";
import Post from "../core/post";
import DataFiller from "../filler";

import markdown = require("markdown");

module.exports = function Init(app: express.Router)
{
    app.use("/:id", async (req, res, next) =>
    {
        const post = await Post.GetWithUrl(req.params.id) as Post;

        if (post) {
            post.content = markdown.markdown.toHTML(post.content);

            res.render("single", await DataFiller({
                title: post.title,
                post,
                description: post.description || null
            }));
        }
        else {
            next();
        }
    });
};
