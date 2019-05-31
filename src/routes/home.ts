import * as express from "express";
import cms from "../api/cms";
import Post from "../core/post";
import DataFiller from "../filler";

module.exports = function Init(app: express.Router)
{
    app.get("/", async (req, res) =>
    {
        const header = await cms.singletons.get("homepage");
        const posts = await Post.LoadPage(1);

        res.render("home", await DataFiller({
            header: header.content,
            posts,
            title: "Веб разработка и игры",
            description: `Привет, меня зовут Павел Наконечный.
            Я молодой и амбициозный веб разработчик, геймдев и проект менеджер.`
        }));
    });
};
