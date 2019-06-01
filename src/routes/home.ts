import * as express from "express";
import Page from "../core/page";
import Post from "../core/post";
import DataFiller from "../filler";

const HeaderSingleton = process.env.HeaderSingleton || "homepage";
module.exports = function Init(app: express.Router)
{
    app.get("/", async (req, res) =>
    {
        const header = await Page.GetWithUrl("/");
        const posts = await Post.LoadPage(1);

        let nextpage = null;

        if (posts && posts.length >= 20) {
            nextpage = "2";
        }

        res.render("home", await DataFiller(req, res, {
            header: header.content,
            posts,
            title: header.title,
            description: header.description,
            nextpage
        }));
    });
};
