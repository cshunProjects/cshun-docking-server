import { Get, Controller, Param, Post, Body,UseGuards, Req, ForbiddenException, NotFoundException ,Put, Delete} from '@nestjs/common';
import { Enrollment } from 'entities/Enrollment';
import { AuthGuard } from '@nestjs/passport';
@Controller('enrollment')
export class EnrollmentController {
    constructor() { }

    @Get()
    async getAll(@Req() req) {
        return await Enrollment.createQueryBuilder().getMany();
    }
    @Get("/:id")
    @UseGuards(AuthGuard('jwt'))
    async getById(@Req() req,@Param('id') id) {
        const enrollment = await Enrollment.findOne(id);
        if(!enrollment) throw new NotFoundException();
        if(req.user.isAdmin || req.user.id === (await enrollment.creator).id) return enrollment;
        throw new ForbiddenException();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Req() req,@Body() input) {
        let enrollment = new Enrollment(input);
        enrollment.creator = req.user;
        return await enrollment.save();
    }

    @Put("/:id")
    @UseGuards(AuthGuard('jwt'))
    async put(@Req() req,@Param('id') id,@Body() input) {
        let enrollment = await Enrollment.findOne(id);
        if(!enrollment) throw new NotFoundException();
        if(req.user.isAdmin || req.user.id === (await enrollment.creator).id) {
            Object.assign(enrollment,input);
            return await enrollment.save();
        }
        throw new ForbiddenException();
    }

    @Delete("/:id")
    @UseGuards(AuthGuard('jwt'))
    async delete(@Req() req,@Param('id') id,@Body() input) {
        let enrollment = await Enrollment.findOne(id);
        if(!enrollment) throw new NotFoundException();
        if(req.user.isAdmin || req.user.id === (await enrollment.creator).id) {
            await enrollment.remove();
            return 'deleted';
        }
        throw new ForbiddenException();
    }
}
