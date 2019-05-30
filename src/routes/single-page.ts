import * as express from "express";
import Page from "../core/page";

module.exports = function Init(app: express.Router)
{
    app.use("/:id", async (req, res, next) =>
    {
        const page = await Page.GetWithUrl(req.params.id);

        if (page) {
            res.render("page", {
                page
            });
        }
        else {
            next();
        }
    });
};
