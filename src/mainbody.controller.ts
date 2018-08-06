import { Get, Controller, Param, Post, Body } from '@nestjs/common';
import { MainBody } from 'entities/MainBody';
import { Connection, EntityManager } from 'typeorm';
@Controller('mainbody')
export class MainBodyController {
    constructor(private readonly manager: EntityManager) { }

    @Get()
    root(): string {
        console.log(this.manager);
        return 'h2';
    }
    @Get("/:id")
    async getById(@Param('id') id) {
        return await MainBody.findOne(id);
    }

    @Post()
    async create(@Body() input) {
        const mainBody = new MainBody(input);
        console.log(mainBody);
        return await mainBody.save();
    }
}
