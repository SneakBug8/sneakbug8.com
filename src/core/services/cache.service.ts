import { Injectable } from "@nestjs/common";
import { RedisService } from "./redis.service";

@Injectable()
export default class CacheModule
{
    public CacheKey = "cache";

    public constructor(private readonly redisService: RedisService)
    {
        this.CacheKey = process.env.CacheKey as string;
    }

    public async get(key: string)
    {
        const cachestring = await this.redisService.redis.hget(this.CacheKey, key);
        if (cachestring) {
            return JSON.parse(cachestring);
        }
        else {
            return null;
        }
    }

    public async set(key: string, value: any)
    {
        await this.redisService.redis.hset(this.CacheKey, key, JSON.stringify(value));
    }
}
