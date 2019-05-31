import redis from "../api/redis";

class CacheModule
{
    public CacheKey: string = "cache";

    public constructor()
    {
        this.CacheKey = process.env.CacheKey as string;
    }

    public async get(key: string)
    {
        const cachestring = await redis.hget(this.CacheKey, key);
        if (cachestring) {
            return JSON.parse(cachestring);
        }
        else {
            return null;
        }
    }

    public async set(key: string, value: any)
    {
        await redis.hset(this.CacheKey, key, JSON.stringify(value));
    }
}

const cache = new CacheModule();

export default cache;
