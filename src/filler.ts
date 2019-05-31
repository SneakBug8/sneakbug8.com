import cache from "./core/cache";

export default async function DataFiller(data: any)
{
    data.footer = await cache.get("footer");
    return data;
}
