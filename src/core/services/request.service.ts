import fetch from "node-fetch";
import { Injectable } from "@nestjs/common";
import DotenvService from "./dotenv.service";
import CacheService from "./cache.service";

import * as _ from "lodash";

@Injectable()
export default class RequestService
{
    constructor(private readonly cacheService: CacheService)
    {
    }

    private Cache: Array<{
        url: string,
        body: any,
        time: number,
        res: any
    }> = [];

    async get<T>(url: string)
    {
        const cached = await this.retreiveFromCache(url, undefined);

        if (cached) {
            return cached;
        }

        const res = await fetch(url);
        const json = await res.json();

        if (res.ok && !json.error && json.total) {
            this.cacheRequest(url, undefined, json.entries);
            return json.entries as T;
        }
        else {
            return undefined;
        }
    }

    async post<T>(url: string, body: any)
    {
        const cached = await this.retreiveFromCache(url, body);

        if (cached) {
            return cached;
        }

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        const res = await fetch(url, init);
        const json = await res.json();

        if (res.ok && !json.error && json.total) {
            this.cacheRequest(url, body, json.entries);
            return json.entries as T;
        }
        else {
            return undefined;
        }
    }

    async retreiveFromCache(url: string, body: any)
    {
        const cached = _.find(this.Cache, (x) => x.url === url && x.body === body);

        if (cached && Date.now() - cached.time < 1000 * 60 * 5) {
            console.log("Retrieved " + url + JSON.stringify(body));
            return cached.res;
        }
        else if (cached) {
            _.remove(this.Cache, (x) => x.url === url && x.body === body);
            return undefined;
        }

        return undefined;
    }

    async cacheRequest(url: string, body: any, res: any)
    {
        console.log("Cached " + url + JSON.stringify(body));

        _.remove(this.Cache, (x) => x.url === url && x.body === body);
        this.Cache.push({
            url,
            body,
            time: Date.now(),
            res
        });
    }
}
