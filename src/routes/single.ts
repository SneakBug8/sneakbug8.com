import * as express from "express";
import Post from "../core/post";

module.exports = function Init(app: express.Router)
{
    app.use("/:id", async (req, res, next) =>
    {
        const post = await Post.GetWithUrl(req.params.id);

        if (post) {
            res.render("single", {
                post
            });
        }
        else {
            next();
        }
    });
};
