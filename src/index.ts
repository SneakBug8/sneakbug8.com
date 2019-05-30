import bodyParser = require("body-parser");
import * as express from "express";
import layouts = require("handlebars-layouts");
import hbs = require("hbs");

hbs.registerHelper(layouts(hbs.handlebars));

const app = express();
const port = 80;

hbs.registerPartials(__dirname  + "/../templates");

app.use("/static", express.static("./static"));

app.use((req, res, next) =>
{
    console.log(req.method + " " + req.url);
    next();
});

app.set("views", "./templates");
app.set("view engine", "hbs");

import requesthandler from "./requesthandler";
requesthandler(app);

app.listen(port, () => console.log(`Express blog listening on port ${port}!`));
