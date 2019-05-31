import * as express from "express";
import cache from "./core/cache";

export default async function DataFiller(req: express.Request, res: express.Response, data: any)
{
    // data.url = domain + req.url;
    data.footer = await cache.get("footer");
    return data;
}