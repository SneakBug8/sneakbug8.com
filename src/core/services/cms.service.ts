import fetch from "node-fetch";
import { Injectable } from "@nestjs/common";
import DotenvService from "./dotenv.service";

@Injectable()
export default class CmsService
{
    CockpitUrl = "";
    CockpitToken = "";
    constructor(private readonly dotenvService: DotenvService)
    {
        this.dotenvService.Init();
        this.CockpitUrl = process.env.CockpitUrl;
        this.CockpitToken = process.env.CockpitToken;
    }

    getUrl(url: string)
    {
        return this.CockpitUrl + url + "?token=" + this.CockpitToken;
    }
    collections = {
        get: async (collectionName: string) =>
        {
            const res = await fetch(this.getUrl("/api/collections/get/" + collectionName));

            const product = await res.json();
            if (res.ok && !product.error && product.total) {
                return product.entries;
            }
            else {
                return false;
            }
        },
        getWithParams: async (collectionName: string, requestBody: any) =>
        {
            const init = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            };

            const res = await fetch(this.getUrl("/api/collections/get/" + collectionName), init);
            const product = await res.json();

            if (res.ok && !product.error && product.total) {
                return product.entries;
            }
            else {
                return false;
            }
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

            return res.json();
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
                return null;
            }
        }
    };
}
