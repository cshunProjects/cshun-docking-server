import { Get, Controller, Param, Post, Body,UseGuards, Req, ForbiddenException, NotFoundException ,Put, Delete} from '@nestjs/common';
import { MainBody } from 'entities/MainBody';
import { AuthGuard } from '@nestjs/passport';
@Controller('mainbody')
export class MainBodyController {
    constructor() { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAll(@Req() req) {
        const result =  await MainBody.createQueryBuilder().where("creatorId = :id",{id:req.user.id}).getMany();
        console.log(result);
        return result;
    }
    @Get("/:id")
    @UseGuards(AuthGuard('jwt'))
    async getById(@Req() req,@Param('id') id) {
        const mainBody = await MainBody.findOne(id);
        if(!mainBody) throw new NotFoundException();
        if(req.user.isAdmin || req.user.id === mainBody.creator.id) return mainBody;
        throw new ForbiddenException();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Req() req,@Body() input) {
        let mainBody = new MainBody(input);
        mainBody.creator = req.user;
        return await mainBody.save();
    }

    @Put("/:id")
    @UseGuards(AuthGuard('jwt'))
    async put(@Req() req,@Param('id') id,@Body() input) {
        let mainBody = await MainBody.findOne(id);
        if(!mainBody) throw new NotFoundException();
        if(req.user.isAdmin || req.user.id === mainBody.creator.id) {
            Object.assign(mainBody,input);
            return await mainBody.save();
        }
        throw new ForbiddenException();
    }

    @Delete("/:id")
    @UseGuards(AuthGuard('jwt'))
    async delete(@Req() req,@Param('id') id,@Body() input) {
        let mainBody = await MainBody.findOne(id);
        if(!mainBody) throw new NotFoundException();
        if(req.user.isAdmin || req.user.id === mainBody.creator.id) {
            await mainBody.remove();
            return 'deleted';
        }
        throw new ForbiddenException();
    }
}
