import { Get, Controller, Res } from "@nestjs/common";

@Controller()
export default class TestController
{
    @Get("/test")
    private async request()
    {
        return "<h1>Test</h1>";
    }
}
