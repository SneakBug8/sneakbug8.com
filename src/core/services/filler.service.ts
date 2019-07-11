import { Injectable } from "@nestjs/common";
import CacheService from "./cache.service";

import * as express from "express";

@Injectable()
export default class FillerService
{
    titlePrefix = "";
    public constructor(private readonly cacheService: CacheService)
    {
        this.titlePrefix = process.env.titlePrefix || "";
    }
    public async Fill(data: LooseObject)
    {
        // data.url = domain + req.url;
        data.sitename = process.env.appName;
        data.footer = await this.cacheService.get("footer");
        data.titlePrefix = this.titlePrefix;
        return data;
    }
}

interface LooseObject
{
    [key: string]: any;
}
