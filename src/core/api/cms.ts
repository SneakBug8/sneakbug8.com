import fetch from "node-fetch";

console.log(process.env);

const CockpitUrl = process.env.CockpitUrl;
const CockpitToken = process.env.CockpitToken;

function getUrl(url: string)
{
    const newurl = CockpitUrl + url + "?token=" + CockpitToken;
    console.log(newurl);
    return newurl;
}

const collections = {
    get: async (collectionName: string) =>
    {
        const res = await fetch(getUrl("/api/collections/get/" + collectionName));

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

        const res = await fetch(getUrl("/api/collections/get/" + collectionName), init);
        const product = await res.json();

        if (res.ok && !product.error && product.total) {
            return product.entries;
        }
        else {
            return false;
        }
    }
};

const forms = {
    submit: async (formName: string, formData: object) =>
    {
        const res = await fetch(getUrl("/api/forms/submit/" + formName), {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                form: formData
            })
        });

        return res.json();
    }
};

const singletons = {
    get: async (singletonName: string) =>
    {
        const res = await fetch(getUrl("/api/singletons/get/" + singletonName));

        if (res.ok && res) {
            return res.json();
        }
        else {
            return null;
        }
    }
};

export default {
    collections,
    forms,
    singletons
};
