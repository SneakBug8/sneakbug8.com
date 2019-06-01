import * as express from "express";
import Post from "../core/post";
import DataFiller from "../filler";

module.exports = function Init(app: express.Router)
{
    app.get("/posts/:num", async (req, res, next) =>
    {
        if (!new RegExp("[0-9]+").test(req.params.num)) {
            next();
            return;
        }

        const pagenum = Number.parseInt(req.params.num, 10);

        if (pagenum === 1) {
            res.redirect("/");
            return;
        }

        const posts = await Post.LoadPage(pagenum);

        if (!posts || !posts.length) {
            next();
            return;
        }

        let nextpage = null;
        let prevpage = null;

        if (posts && posts.length >= 20) {
            nextpage = pagenum + 1;
        }

        if (pagenum > 1) {
            prevpage = pagenum - 1;
        }

        res.render("posts", await DataFiller(req, res, {
            posts,
            nextpage,
            prevpage
        }));
    });
};
