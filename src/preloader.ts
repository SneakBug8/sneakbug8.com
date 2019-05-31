import cms from "./api/cms";
import cache from "./core/cache";

export default async function Preload()
{
    const footer = await cms.singletons.get("footer");
    await cache.set("footer", footer);

    console.log("Loaded footer into cache: " + JSON.stringify(footer));
    console.log("Preloading completed");
}
