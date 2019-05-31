import redis from "../api/redis";

class CacheModule
{
    public async get(key: string)
    {
        const cachestring = await redis.hget("blog:cache", key);
        if (cachestring) {
            return JSON.parse(cachestring);
        }
        else {
            return null;
        }
    }

    public async set(key: string, value: any)
    {
        await redis.hset("blog:cache", key, JSON.stringify(value));
    }
}

const cache = new CacheModule();

export default cache;
