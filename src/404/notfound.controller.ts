import * as express from "express";
import { Controller, Res, All } from "@nestjs/common";
import NotFoundService from "../404/notfound.service";

@Controller()
export default class NotfoundController
{
    constructor(private readonly notfoundService: NotFoundService) { }

    @All("*")
    async request(@Res() res: express.Response)
    {
        this.notfoundService.Send404(res);
    }
}
