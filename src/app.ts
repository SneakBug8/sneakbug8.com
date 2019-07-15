import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

import * as path from "path";

import layouts = require("handlebars-layouts");
import hbs = require("hbs");

import minify = require("express-minify");
import compression = require("compression");

import * as express from "express";
import { DevMiddleware } from "devlogger";

export class App
{
    private config: any;
    constructor(config: any)
    {
        this.config = config;

    }
    private configureHandlebars()
    {
        hbs.registerHelper(layouts(hbs.handlebars));

        const templatesPath = this.config.templatesPath || "templates";
        hbs.registerPartials(__dirname + "/../" + templatesPath);
    }

    public async bootstrap()
    {
        this.configureHandlebars();

        const app = await NestFactory.create<NestExpressApplication>(AppModule);

        // set Static Assets
        app.useStaticAssets(path.join(__dirname, "..", "www"), {
            maxAge: 31536000
        });

        // Configure Handlebars
        const templatesPath = this.config.templatesPath || "templates";
        app.setBaseViewsDir(path.join(__dirname, "..", templatesPath));
        app.setViewEngine("hbs");

        // Many middlewares
        app.use(compression());
        app.use(minify());
        app.use(express.urlencoded({ extended: false }));

        app.use(DevMiddleware);

        await app.listen(this.config.port);
    }
}
