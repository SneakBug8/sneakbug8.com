import fetch from "node-fetch";

const CockpitUrl = process.env.CockpitUrl;
const CockpitToken = process.env.CockpitToken;

function getUrl(url: string)
{
    return CockpitUrl + url + "?token=" + CockpitToken;
}

const collections = {
    get: async (name: string) =>
    {
        const res = await fetch(getUrl("/api/collections/get/" + name));

        const product = await res.json();
        if (res.ok && !product.error && product.total) {
            return product.entries;
        }
        else {
            return false;
        }
    },
    getWithParams: async (name: string, body: any) =>
    {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        const res = await fetch(getUrl("/api/collections/get/" + name), init);
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
    submit: async (name: string, data: object) =>
    {
        const res = await fetch(getUrl("/api/forms/submit/" + name), {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                form: data
            })
        });

        return res.json();
    }
};

const singletons = {
    get: async (name: string) => {
        const res = await fetch(getUrl("/api/singletons/get/" + name));

        if (res.ok && res) {
            return res.json();
        }
        else {
            return null;
        }
    }
}

export default {
    collections,
    forms,
    singletons
};
