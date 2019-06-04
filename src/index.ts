import bodyParser = require("body-parser");
import * as express from "express";
import layouts = require("handlebars-layouts");
import hbs = require("hbs");

import * as dotenv from "dotenv";
dotenv.config();

hbs.registerHelper(layouts(hbs.handlebars));

const app = express();
const port = process.env.port || 1010;

const templatesPath = process.env.templatesPath || "templates";

hbs.registerPartials(__dirname + "/../" + templatesPath);

app.use(express.static("./root"));
app.use("/static", express.static("./static"));

/*app.use((req, res, next) =>
{
    console.log(req.method + " " + req.url);
    next();
});*/

app.set("views", "./" + templatesPath);
app.set("view engine", "hbs");

import Preload from "./preloader";
Preload();

import requesthandler from "./requesthandler";
requesthandler(app);

const appName = process.env.appName || "Random blog";

app.listen(port, () => console.log(appName + ` listening on port ${port}!`));
