import * as express from "express";
import Post from "../core/post";
import DataFiller from "../filler";

module.exports = function Init(app: express.Router)
{
    app.get("/posts/:num", async (req, res) =>
    {
        const posts = await Post.LoadPage(req.params.num);

        res.render("posts", await DataFiller(req, res, {
            posts
        }));
    });
};
