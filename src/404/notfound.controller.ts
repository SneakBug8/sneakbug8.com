import * as express from "express";
import { Get, Controller, Res } from "@nestjs/common";
import NotFoundService from "../404/notfound.service";

@Controller()
export default class NotfoundController
{
    constructor(private readonly notfoundService: NotFoundService) { }

    @Get("*")
    async request(@Res() res: express.Response)
    {
        this.notfoundService.Send404(res);
    }
}
