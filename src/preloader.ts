import cms from "./api/cms";
import cache from "./core/cache";

const FooterSingleton = process.env.FooterSingleton || "footer";

export default async function Preload()
{
    const footer = await cms.singletons.get(FooterSingleton);
    await cache.set("footer", footer);

    console.log("Loaded footer into cache: " + JSON.stringify(footer));
    console.log("Preloading completed");
}
