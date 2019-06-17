import Redis = require("ioredis");

export class RedisService
{
    public redis: any;
    constructor()
    {
        this.redis = new Redis();
    }
};
