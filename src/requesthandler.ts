import express = require("express");
import fs = require("fs");
import path = require("path");

export default function Init(app: express.Application)
{
    const normalizedPath = path.join(__dirname, "routes");

    const files = fs.readdirSync(normalizedPath);

    const router = express.Router();

    router.get("/favicon.ico", (req, res) =>
    {
        res.header(404).render("404");
    });

    for (const file of files) {
        const route = require("./routes/" + file);
        route(router);
    }

    app.use(router);

    app.use((req, res, next) =>
    {
        res.status(404).render("404");
    });
}
