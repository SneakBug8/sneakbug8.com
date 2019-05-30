import * as express from "express";
import Page from "../core/page";

import markdown = require("markdown");

module.exports = function Init(app: express.Router)
{
    app.use("/:id", async (req, res, next) =>
    {
        const page = await Page.GetWithUrl(req.params.id) as Page;

        if (page) {
            page.content = markdown.markdown.toHTML(page.content);

            res.render("page", {
                title: page.title,
                page
            });
        }
        else {
            next();
        }
    });
};
