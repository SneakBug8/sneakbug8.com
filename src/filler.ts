import * as express from "express";
import cache from "./core/cache";

const titlePrefix = process.env.titlePrefix || "";

export default async function DataFiller(req: express.Request, res: express.Response, data: any)
{
    // data.url = domain + req.url;
    data.sitename = process.env.appName;
    data.footer = await cache.get("footer");
    data.titlePrefix = titlePrefix;
    return data;
}