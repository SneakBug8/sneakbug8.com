import { Injectable } from "@nestjs/common";
import { RedisService } from "./redis.service";
import DotenvService from "../../base/dotenv.service";

@Injectable()
export default class CacheService
{
    public CacheKey = "cache";

    public constructor(private readonly redisService: RedisService, private readonly dotenvService: DotenvService)
    {
        this.CacheKey = dotenvService.config.CacheKey || this.CacheKey;
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
