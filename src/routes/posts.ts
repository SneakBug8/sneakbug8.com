import * as express from "express";
import Post from "../core/post";

module.exports = function Init(app: express.Router)
{
    app.get("/posts/:num", async (req, res) =>
    {
        const posts = await Post.LoadPage(req.params.num);

        res.render("posts", {
            posts
        });
    });
};
