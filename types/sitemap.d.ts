declare module "sitemap" {
    export = sm;

    const sm: BaseClass;

    class BaseClass
    {
        createSitemap: (options: {
            hostname: string | undefined,
            cacheTime: number | undefined,
            urls: SitemapEntry[] | undefined;
        } | {}) => Sitemap
    }
}

declare class SitemapEntry
{
    url: string;
    changefreq: string | undefined;
    priority: number | undefined;
}

declare class Sitemap
{
    public toString(): string;
    public add(entry: SitemapEntry): void;
    public del(entry: SitemapEntry): void;
    public del(entry: string): void;
}