import fetch from "node-fetch";
import { Injectable } from "@nestjs/common";
import DotenvService from "./dotenv.service";
import RequestService from "./request.service";

@Injectable()
export default class CmsService
{
    CockpitUrl = "";
    CockpitToken = "";
    constructor(private readonly dotnetService: DotenvService,
        private readonly requestService: RequestService)
    {
        this.CockpitUrl = dotnetService.config.CockpitUrl as string;
        this.CockpitToken = dotnetService.config.CockpitToken as string;
    }

    getUrl(url: string)
    {
        return this.CockpitUrl + url + "?token=" + this.CockpitToken;
    }
    collections = {
        get: async <T>(collectionName: string) =>
        {
            return await this.requestService.get<T>(this.getUrl("/api/collections/get/" + collectionName));
        },
        getWithParams: async <T>(collectionName: string, requestBody: RequestParams) =>
        {
            return await this.requestService.post<T>(this.getUrl("/api/collections/get/" + collectionName),
                requestBody);
        }
    };

    forms = {
        submit: async (formName: string, formData: object) =>
        {
            const res = await fetch(this.getUrl("/api/forms/submit/" + formName), {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form: formData
                })
            });

            return await res.json();
        }
    };

    singletons = {
        get: async (singletonName: string) =>
        {
            const res = await fetch(this.getUrl("/api/singletons/get/" + singletonName));

            if (res.ok && res) {
                return res.json();
            }
            else {
                return undefined;
            }
        }
    };
}

interface RequestParams
{
    filter?: {
        _id?: number | undefined;
        _created?: number | undefined;
        _modified?: number | undefined;
        [key: string]: string | number | boolean | undefined;
    } | undefined;
    sort?: {
        _id?: number | undefined;
        _created?: number | undefined;
        _modified?: number | undefined;
        [key: string]: number | undefined;
    } | undefined;
    limit?: number | undefined;
    skip?: number | undefined;
    fields?: {
        _id?: number | undefined;
        _created?: number | undefined;
        _modified?: number | undefined;
        [key: string]: number | undefined;
    } | undefined;
}

export interface CmsObjectData
{
    _created: string,
    _modified: string,
    [key: string]: any;
}
