import * as express from "express";
import Post from "../core/post";

module.exports = function Init(app: express.Router)
{
    app.get("/", async (req, res) =>
    {
        const headline = await Post.LoadPage(1);

        res.render("home", {
            posts: headline,
            title: "Web development and Games"
        });
    });
};
