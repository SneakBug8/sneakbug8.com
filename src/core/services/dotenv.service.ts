import * as dotenv from "dotenv";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class DotenvService
{
    public Init()
    {
        dotenv.config();
    }
}
